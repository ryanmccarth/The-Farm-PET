import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";

import WriteRequesters from './WriteRequesters';
import WriteReview from './WriteReview';

import session from "../session";

import './temp/WriteContent.css';

class Write extends Component {
  state = {
    isWriting: false,
    isLoading: false,
    request: null
  };

  constructor(props) {
    super(props)
    this.getRequests()
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  async getRequests() {
    if (this._ismounted) {
      this.setState({requests: undefined});
    }
    const res = await fetch(`/api/user/${session.userId}/requests`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    if (res.status !== 200) {
      this.setState({
        showBottomAlert: true,
        bottomAlertVariant: "danger",
        bottomAlertContent: "An unknown error occurred while retrieving users that have requested your review. Please try again later."
      })
      return;
    }
    const body = await res.json();
    console.log(`Requests: ${body}`);
    //console.log(`Requests[0].draftId is ${body[0].draftId}`);
    //console.log(`Requests[1].draftId is ${body[1].draftId}`);
    if (this._ismounted) {
      this.setState({requests: body});
    } else {
      this.state.requests = body;
    }
  }

  backButton() {
    this.setState({isWriting: false, request: undefined, showBottomAlert: false});
  }

  // This deletes a request with the given requestId
  // Idea: maybe change its rejectedStatus instead? ON HOLD until implementation of such field
  async deleteRequest(requestId, requesterName, draftId){

    // Check if an associated draft exists
    if(draftId!==-1){
      // Delete the draft 
      const res = await fetch(`api/draft/${draftId}`, {
          method: "DELETE",
      });

      if(res.status!==200){
        this.setState({
          showTopAlert: false,
          showBottomAlert: true,
          bottomAlertVariant: "danger",
          bottomAlertContent: 'There was an error deleting the associated draft. Please try again.'
        })
      }
      // maybe I should move the route in the review route? A draft is a review
    }

    const res = await fetch(`/api/request/${requestId}/delete`, {
      method: "DELETE",
    });

    // Indicate success
    if(res.status===200){
      this.setState({
        showTopAlert: true,
        showBottomAlert: false,
        topAlertVariant: "success",
        topAlertContent: `Review request for ${requesterName} denied successfully`,
      });
      
      // Refresh requests list
      this.getRequests();
    }
    // Indicate failure
    else {
      this.setState({
        showTopAlert: false,
        showBottomAlert: true,
        bottomAlertVariant: "danger",
        bottomAlertContent: `There was an error rejecting the request. Please try again.`
      });
    }
  }

  async submitReview(text, isDraft) {
    this.setState({isLoading: true});
    document.body.style.cursor='wait';

    // NOTE! You do not need to send a delete fetch to request.js!
    const res = await fetch("/api/review", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      // function expects the following:
      // reviewId: int representing Id of current review (if editing one)
      // requestId: int, represents selected request's Id
      // reviewerId: int, revieweeId: int, text: String
      // datetime: String in format "YYYY-MM-DD hh:mm:ss"
      // isDraft: boolean
      body: JSON.stringify({
        reviewId: this.state.request.draftId,    // reviewId will be -1 if this isn't a previously saved draft
        requestId: this.state.request.requestId,
        reviewerId: session.userId,
        revieweeId: this.state.request.userId,
        text: text,
        datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        isDraft: isDraft,
      })
    });

    document.body.style.cursor='default';

    // if success
    if (res.status === 200) {
      this.setState({
        isLoading: false,
        isWriting: false,
        showTopAlert: true,
        showBottomAlert: false,
        topAlertVariant: "success",
        topAlertContent: `${isDraft ? "Draft" : "Review"} for ${this.state.request.name} ${isDraft ? "saved" : "submitted"} successfully`,
        request: null,        // reset selected request upon success
        drafttext: ""         // reset draft text upon success
      });
      
      // refresh requests
      this.getRequests();
    }
    else {
      this.setState({
        isLoading: false,
        showTopAlert: false,
        showBottomAlert: true,
        bottomAlertVariant: "danger",
        bottomAlertContent: `There was an error submitting your review. Please try again.`
      });
    }
  }

  // Purpose: retrieve draft with draftId and return its text
  // Input:   request object
  // Returns: string, text in the retrieved draft (review)
  async getDraft(request) {
    const res = await fetch(`/api/draft/${request.draftId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    if (res.status !== 200) {
      this.setState({
        showBottomAlert: true,
        bottomAlertVariant: "danger",
        bottomAlertContent: "An unknown error occurred while retrieving the draft."
      })
      return;
    }

    const body = await res.json();
    return body.reviewText;

    // delay to simulate the network call
    //await new Promise(resolve => setTimeout(resolve, 1000));
    //return "example draft text";
  }

  async handleRequestSelect(request) {
    //this.setState({request: request});
    let drafttext = "";
    if (request.draftId !== -1) {
      //console.log(`request is ${request}`)
      this.setState({isLoading: true});
      document.body.style.cursor='wait';
      drafttext = await this.getDraft(request);
      document.body.style.cursor='default';
    }
    this.setState({isWriting: true, request: request, drafttext: drafttext, isLoading: false});
  }

  render() {
    return <React.Fragment>
      <Container id="write-container">
        <div id="alert-container-top">
          {this.state.showTopAlert
            ? <Alert variant={this.state.topAlertVariant} dismissible onClose={() => this.setState({showTopAlert: false})}>
                {this.state.topAlertContent}
              </Alert>
            : <></>
          }
        </div>
        {this.state.isWriting
        ? <WriteReview request={this.state.request} drafttext = {this.state.drafttext} onBackButton={this.backButton.bind(this)} onSubmit={this.submitReview.bind(this)} isLoading={this.state.isLoading} />
        : <WriteRequesters onRequestSelect={this.handleRequestSelect.bind(this)} onDeleteButton={this.deleteRequest.bind(this)} requests={this.state.requests} isLoading={this.state.isLoading} />}
        <div id="alert-container-bottom">
          {this.state.showBottomAlert
            ? <Alert variant={this.state.bottomAlertVariant} dismissible onClose={() => this.setState({showBottomAlert: false})}>
                {this.state.bottomAlertContent}
              </Alert>
            : <></>
          }
        </div>
      </Container>
    </React.Fragment>;
  }
}

export default Write;

import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";

import WriteRequesters from './WriteRequesters';
import WriteReview from './WriteReview';

import session from "../session";

import './temp/WriteContent.css';

class Write extends Component {
  state = {
    userId: 0,        // TODO: this might be obsolete. state.requester.userId replaces it
    isWriting: false,
    //editingDraft: false   // 
  };

  constructor(props) {
    super(props)
    this.getRequesters()
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  async getRequesters() {
    if (this._ismounted) {
      this.setState({requests: undefined});
    }
    //const res = await fetch(`/api/requests/${this.state.userId}`, { // OLD CALL
    const res = await fetch(`/api/requests/${session.userId}`, {
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
    if (this._ismounted) {
      this.setState({requests: body});
    } else {
      this.state.requests = body;
    }
  }

  backButton() {
    this.setState({isWriting: false, requester: undefined, showBottomAlert: false});
  }

  async submitReview(text, isDraft) {
    console.log(`submitting ${text} for ${this.state.requester.name}`);

    // TODO
    // we need to make a request to the API here to submit the review, then set either the "success" or "failure" state depending on the api response
    // for the failure case, we can change bottomAlertContent to be a more descriptive error depending on what went wrong with the api call

    let _this = this;         // keep a reference to this instance of the object
    //let date = new Date();    // get current date and time
    
    //let datestring = `${date.getFullYear()}-${("0"+(date.getMonth()+1)).slice(-2)}-${("0"+date.getDate()).slice(-2)} ${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`;
    let reviewId = (_this.state.review) ? _this.state.review.reviewId : -1;

    const res = await fetch("/api/auth/writereview", {
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
        reviewId: reviewId,                       // reviewId will be -1 if this isn't a previously saved draft
        requestId: _this.state.request.requestId, // TODO: requestId should be taken from the selected request
        reviewerId: session.userId,
        revieweeId: _this.state.requester.userId, // these could be switched, logic is funky rn
        text: text,
        datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        isDraft: isDraft,
        //wasDraft: _this.state.editingDraft
        // TODO: after the call, change the global request id
      })
    });

    if (res.status === 200) {
      this.setState({
        isWriting: false,
        showTopAlert: true,
        showBottomAlert: false,
        topAlertVariant: "success",
        topAlertContent: `Review for ${this.state.requester.name} submitted successfully`
      });
      // refresh requesters
      this.getRequesters();
    } 
    else {
      this.setState({
        showTopAlert: false,
        showBottomAlert: true,
        bottomAlertVariant: "danger",
        bottomAlertContent: `There was an error submitting your review. Please try again.`
      });
    }
  }

  handleRequesterSelect(requester) {
    this.setState({isWriting: true, requester: requester}); // TODO: make it add request to global state
    // TODO: IMPORTANT!! Change "requester" fields in this whole file to "request" (returned entry from WriteRequesters.jsx)
    // the returned entry is in the format "request" and not "requester", look at WriteRequesters.jsx "selected" state field to understand
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
        ? <WriteReview requester={this.state.requester} onBackButton={this.backButton.bind(this)} onSubmit={this.submitReview.bind(this)} />
        : <WriteRequesters onRequesterSelect={this.handleRequesterSelect.bind(this)} requests={this.state.requests} />}
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

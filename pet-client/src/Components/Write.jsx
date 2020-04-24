import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";

import WriteRequesters from './WriteRequesters';
import WriteReview from './WriteReview';

import session from "../session";

import './temp/WriteContent.css';

class Write extends Component {
  state = {
    //userId: 0,        // obsolete. session.userId replaces it. For requester Id, check request.name
    isWriting: false,
    request: null       // TODO: reset request (set to null) after a review is submitted
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
    //const res = await fetch(`/api/requests/${this.state.userId}`, { // OLD CALL
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
    if (this._ismounted) {
      this.setState({requests: body});
    } else {
      this.state.requests = body;
    }
  }

  backButton() {
    this.setState({isWriting: false, request: undefined, showBottomAlert: false});
  }

  async submitReview(text, isDraft) {
    console.log(`submitting ${text} for ${this.state.request.name}`);

    //let datestring = `${date.getFullYear()}-${("0"+(date.getMonth()+1)).slice(-2)}-${("0"+date.getDate()).slice(-2)} ${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`;
    //let reviewId = (this.state.request.) ? this.state.review.reviewId : -1;
    // 

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
        reviewId: this.state.request.draftId,                       // reviewId will be -1 if this isn't a previously saved draft
        requestId: this.state.request.requestId, // TODO: requestId should be taken from the selected request
        reviewerId: session.userId,
        revieweeId: this.state.request.userId, // these could be switched, logic is funky rn
        text: text,
        datetime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        isDraft: isDraft,
      })
    });

    if (res.status === 200) {
      this.setState({
        isWriting: false,
        showTopAlert: true,
        showBottomAlert: false,
        topAlertVariant: "success",
        topAlertContent: `Review for ${this.state.request.name} submitted successfully`,
        request: null, // reset selected request upon success
      });
      // refresh requests
      this.getRequests();
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

  handleRequestSelect(request) {
    this.setState({isWriting: true, request: request}); 
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
        ? <WriteReview request={this.state.request} onBackButton={this.backButton.bind(this)} onSubmit={this.submitReview.bind(this)} />
        : <WriteRequesters onRequestSelect={this.handleRequestSelect.bind(this)} requests={this.state.requests} />}
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

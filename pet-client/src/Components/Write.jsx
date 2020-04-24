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
    this.setState({isLoading: true});
    document.body.style.cursor='wait';

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
        topAlertContent: `Review for ${this.state.request.name} submitted successfully`,
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

  async getDraft() {
    // const res = await fetch();    // TODO: fix this to call review fetching function for single review
    //                               // with parameter in body this.state.request.draftId

    // delay to simulate the network call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "example draft text";
  }

  async handleRequestSelect(request) {
    let drafttext = "";
    if (request.draftId !== -1) {
      this.setState({isLoading: true});
      document.body.style.cursor='wait';
      drafttext = await this.getDraft();
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
        : <WriteRequesters onRequestSelect={this.handleRequestSelect.bind(this)} requests={this.state.requests} isLoading={this.state.isLoading} />}
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

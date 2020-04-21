import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Alert from "react-bootstrap/Alert";

import WriteRequesters from './WriteRequesters';
import WriteReview from './WriteReview';

import './temp/WriteContent.css';

class Write extends Component {
  state = {
    userId: 0,
    isWriting: false
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
      this.setState({employees: undefined});
    }
    const res = await fetch(`/api/requests/${this.state.userId}`, {
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
      this.setState({employees: body});
    } else {
      this.state.employees = body;
    }
  }

  backButton() {
    this.setState({isWriting: false, requester: undefined, showBottomAlert: false});
  }

  async submitReview(text) {
    console.log(`submitting ${text} for ${this.state.requester.name}`);

    // TODO
    // we need to make a request to the API here to submit the review, then set either the "success" or "failure" state depending on the api response
    // for the failure case, we can change bottomAlertContent to be a more descriptive error depending on what went wrong with the api call

    // success
    this.setState({
      isWriting: false,
      showTopAlert: true,
      showBottomAlert: false,
      topAlertVariant: "success",
      topAlertContent: `Review for ${this.state.requester.name} submitted successfully`
    });
    // refresh requesters
    this.getRequesters();

    // failure
    // this.setState({
    //   showTopAlert: false,
    //   showBottomAlert: true,
    //   bottomAlertVariant: "danger",
    //   bottomAlertContent: `There was an error submitting your review. Please try again.`
    // });
  }

  handleRequesterSelect(requester) {
    this.setState({isWriting: true, requester: requester});
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
        : <WriteRequesters onRequesterSelect={this.handleRequesterSelect.bind(this)} employees={this.state.employees} />}
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

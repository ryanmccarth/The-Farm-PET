import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './temp/WriteContent.css'

class WriteReviews extends Component {
  state = {};
  // we should implement something to get this from the database (depending on prev screen)
  revieweename = "Joe Smith";

  backButton() {
    console.log("back button pressed");
  }

  async submitReview(e) {
    e.preventDefault();
    console.log("success");
  }

  render() {
    return <React.Fragment>
      <Container id="write-container">
        <h4>Write a review for {this.revieweename}</h4>
        <Form id="write-review-form" onSubmit={this.submitReview}>
          <Form.Group controlId="write-review-textarea">
            <Form.Control as="textarea" rows="6" placeholder = "Write review here..." required />
          </Form.Group>
          <div id="write-btn-back">
            <Button
            variant = "primary"
            onClick = {this.backButton}>
              Go back
            </Button>
          </div>
          <div id="write-btn-submit" className="text-right">
            <Button
            variant = "primary"
            type = "submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </React.Fragment>;
  }
}

export default WriteReviews;

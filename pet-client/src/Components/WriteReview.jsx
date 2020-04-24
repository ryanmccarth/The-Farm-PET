import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './temp/WriteReview.css';

class WriteReview extends Component {
  state = {};

  submitReview(e) {
    e.preventDefault();
    this.props.onSubmit(e.target.elements[0].value, false);
  }

  render() {
    return<div id="writeReviewContainer">
        <h4>Write a review for {this.props.request.name}</h4>
        <Form id="write-review-form" onSubmit={this.submitReview.bind(this)}>
          <Form.Group controlId="writeReviewTextarea">
            { this.props.drafttext===""
            ? <Form.Control as="textarea" rows="6" placeholder = "Write review here..." required />
            : <Form.Control as="textarea" rows="6" placeholder = "Write review here..." defaultValue = {this.props.drafttext} required />
            }
          </Form.Group>
          <div id="write-btn-back">
            <Button
            variant = "outline-primary"
            onClick = {this.props.onBackButton}>
              Back
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
    </div>;
    }
}

export default WriteReview;

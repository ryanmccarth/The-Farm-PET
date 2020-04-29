import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './temp/WriteReview.css';

class WriteReview extends Component {
  state = {};

  submitReview(e) {
    e.preventDefault();
    this.props.onSubmit(e.target.elements[0].value, false);
  }

  submitDraft(e) {
    e.preventDefault();
    this.props.onSubmit(this.refs.mainform.value, true); // this might be weird
  }

  render() {
    return<div id="writeReviewContainer">
        <h4>Write a review for {this.props.request.name}</h4>
        <Form id="write-review-form" onSubmit={this.submitReview.bind(this)}>
          <Form.Group controlId="writeReviewTextarea">
            <Form.Control as="textarea" rows="6" placeholder = "Write review here..."
            defaultValue = {this.props.drafttext ? this.props.drafttext : ""} required
            style={this.state.selected === null || this.props.isLoading ? { pointerEvents: 'none' } : {}}
            disabled = {this.props.isLoading} 
            ref = "mainform"/>
          </Form.Group>
          <ButtonToolbar className = "justify-content-between">
            <ButtonGroup>
              <Button
              style={this.props.isLoading ? { pointerEvents: 'none' } : {}}
              disabled={this.props.isLoading}
              variant = "outline-primary"
              onClick = {this.props.onBackButton}>
                Back
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
              style={this.props.isLoading ? { pointerEvents: 'none'}: {}}
              disabled = {this.props.isLoading}
              variant = "outline-secondary"
              onClick = {this.submitDraft.bind(this)}>
                Save as draft
              </Button>
              <Button
              className="pl-3 pr-3"
              style={this.props.isLoading ? { pointerEvents: 'none' } : {}}
              disabled={this.props.isLoading}
              variant = "primary"
              type = "submit">
                Submit
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Form>
    </div>;
    }
}

export default WriteReview;

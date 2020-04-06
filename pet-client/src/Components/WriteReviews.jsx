import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

class WriteReviews extends Component {
  state = {};
  render() {
    return <React.Fragment>
      <Container className="write-container d-flex">
        <Container className="row justify-content-center align-self-center">
          <Form id="write-review-form" onSubmit={submitReview}>
            <h4>You are writing a review for {revieweename}</h4>

            <Form.Group controlId="write-review-textarea">
              <Form.Control as="textarea" rows="6" placeholder = "Write review here..." />
            </Form.Group>

            <Row className="justify-content-between">
              <Button
              variant = "primary"
              onClick = {console.log("back button pressed")}>
                Go back
              </Button>

              <Button
              variant = "primary"
              type = "submit">
                Submit
              </Button>
            </Row>
            <Row>
              <div id = "submitresult"></div>
            </Row>
          </Form>
        </Container>
      </Container>
    </React.Fragment>;
  }
}

export default WriteReviews;

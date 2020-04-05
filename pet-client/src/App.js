import React from 'react';
import ReactDOM from 'react-dom';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import './App.css';

function App() {
  let revieweename = "Joe Smith";
  // we should implement something to get this from the database (depending on prev screen)

  async function submitReview(e)
  {
    e.preventDefault();
    console.log("success");
    // this doesn't work for some reason. at least not in the git console. ideas?
    // (talking about the console.log)
  }

  // UNSURE HOW TO CENTER THE FORM VERTICALLY! (see code below) || ||
  //                                                            \/ \/

  return (
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
  );
}

export default App;

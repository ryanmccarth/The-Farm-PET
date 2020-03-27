import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './App.css';

function App() {
  var success;
  async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });

    let message, alertVariant;
    if (res.status === 401) {
      message = "Invalid username or password. Please try again.";
      alertVariant = "danger";
    }
    else if (res.status !== 200) {
      message = "An unknown error occurred. Please try again later.";
      alertVariant = "warning";
    }
    else {
      const body = await res.json();
      message = "Success! Your token is " + body.token + ".";
      alertVariant = "success";
      success = true;
    }
    if(success){
      ReactDOM.render(<Home />, document.getElementById("successful-login"))
    }
    else{
      ReactDOM.render(<Alert variant={alertVariant}>{message}</Alert>, document.getElementById("login-result"))
    }
  }
  return (
    <div id = "successful-login">
    <Container className="login-container d-flex">
      <Container className="row justify-content-center align-self-center">
        <Form id="login-form" onSubmit={handleLogin}>
          <h3>Sign in</h3>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <div id="login-result" />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
    </div>
  );
}
export default App;
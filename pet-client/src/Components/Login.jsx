import React, { Component } from "react";
import ReactDOM from "react-dom";

import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import session from "../session";

import loginAvatar from "../Media/the-bull-no-text.png"; 

import "raleway-webfont";
import './temp/General.scss';
import "./temp/Login.css";

class Login extends Component {
  async handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    let message, alertVariant;
    if (res.status === 401) {
      message = "Invalid username or password. Please try again.";
      alertVariant = "danger";
    } else if (res.status !== 200) {
      message = "An unknown error occurred. Please try again later.";
      alertVariant = "warning";
    } else {
      const body = await res.json();
      if (rememberMe) {
        session.save(body.session, undefined); // no expiration
      } else {
        const exp = new Date();
        exp.setDate(exp.getDate() + 1); // expire in 24 hours
        session.save(body.session, exp);
      }
      message = "Success! Your token is " + body.token + ".";
      alertVariant = "success";
      this.props.updateSession(session);
      this.props.updateContent("read");
      return;
    }

    ReactDOM.render(
      <Alert variant={alertVariant}>{message}</Alert>,
      document.getElementById("login-result")
    );
  }

  render() {
    return (
      <div className="themeLighterGray w-100 windowDiv">
        <Container className="login-container d-flex containerLogin">
          <Container className="row justify-content-center" style={{margin: "0 auto"}}>
            <div className="loginAvatar" style={{backgroundImage: `url(${loginAvatar})`}}/>
            
            <Form id="login-form" className="rounded mb-0 themeLighterRed formMainLogin"onSubmit={(e) => this.handleLogin(e)}>
              <h3 className="fontRaleway">Sign in</h3>

              <Form.Group controlId="email">
                <Form.Label className="fontRaleway">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="fontRaleway">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="rememberMe">
                <Form.Check type="checkbox" label="Remember me" className="fontRaleway" />
              </Form.Group>
              <div id="login-result" />
              <Button variant="light" className="colorDark" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Login;

import React, { Component } from "react";

class NavBar extends Component {
  state = {};

  homeHandler() {
    this.props.update("login");
  }
  readHandler() {
    this.props.update("read");
  }
  requestHandler() {
    this.props.update("request");
  }
  writeHandler() {
    this.props.update("write");
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">PET</span>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#top" onClick={this.homeHandler}>
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#top" onClick={this.readHandler}>
                Read
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#top" onClick={this.requestHandler}>
                Request
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#top" onClick={this.writeHandler}>
                Write
              </a>
            </li>
            <li className="nav-item">
              <button className="nav-link disabled">Dashboard</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;

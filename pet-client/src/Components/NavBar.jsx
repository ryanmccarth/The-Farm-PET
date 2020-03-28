import React, { Component } from "react";

class NavBar extends Component {
  pageHandler(page) {
    this.props.update(page);
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
            <li
              className={
                "nav-item" + (this.props.page === "login" && " active")
              }
            >
              <a
                className="nav-link"
                href="#top"
                onClick={() => this.pageHandler("login")}
              >
                Login
                {this.props.page === "login" && (
                  <span className="sr-only">(current)</span>
                )}
              </a>
            </li>
            <li
              className={"nav-item" + (this.props.page === "read" && " active")}
            >
              <a
                className="nav-link"
                href="#top"
                onClick={() => this.pageHandler("read")}
              >
                Read
                {this.props.page === "read" && (
                  <span className="sr-only">(current)</span>
                )}
              </a>
            </li>
            <li
              className={
                "nav-item" + (this.props.page === "request" && " active")
              }
            >
              <a
                className="nav-link"
                href="#top"
                onClick={() => this.pageHandler("request")}
              >
                Request
                {this.props.page === "request" && (
                  <span className="sr-only">(current)</span>
                )}
              </a>
            </li>
            <li
              className={
                "nav-item" + (this.props.page === "write" && " active")
              }
            >
              <a
                className="nav-link"
                href="#top"
                onClick={() => this.pageHandler("write")}
              >
                Write
                {this.props.page === "write" && (
                  <span className="sr-only">(current)</span>
                )}
              </a>
            </li>
            <li className="nav-item">
              <a href="#top" className="nav-link disabled">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;

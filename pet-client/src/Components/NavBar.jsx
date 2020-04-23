import React, { Component } from "react";
import session from "../session";

class NavBar extends Component {
  pageHandler(page) {
    this.props.updateContent(page);
  }
  sessionLogout() {
    session.delete();
    this.props.updateSession(session);
    this.props.updateContent("login");
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
              className={"nav-item" + (this.props.page === "read" && " active")}
            >
              <a
                className={"nav-link" + (!session.exists() ? " disabled" : "")}
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
                className={"nav-link" + (!session.exists() ? " disabled" : "")}
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
                className={"nav-link" + (!session.exists() ? " disabled" : "")}
                href="#top"
                onClick={() => this.pageHandler("write")}
              >
                Write
                {this.props.page === "write" && (
                  <span className="sr-only">(current)</span>
                )}
              </a>
            </li>
          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <a
                className={"nav-link" + (!session.exists() ? " disabled" : "")}
                href="top"
                onClick={() => this.sessionLogout()}
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;

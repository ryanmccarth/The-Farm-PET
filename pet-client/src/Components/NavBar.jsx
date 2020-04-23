import React, { Component } from "react";
import ConditionalTooltip from "./ConditionalTooltip";
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
    const disabledButtonTooltip = "Log in to access this page";
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
              <ConditionalTooltip tooltip={disabledButtonTooltip} show={!session.exists()}>
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
              </ConditionalTooltip>
            </li>
            <li
              className={
                "nav-item" + (this.props.page === "request" && " active")
              }
            >
              <ConditionalTooltip tooltip={disabledButtonTooltip} show={!session.exists()}>
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
              </ConditionalTooltip>
            </li>
            <li
              className={
                "nav-item" + (this.props.page === "write" && " active")
              }
            >
              <ConditionalTooltip tooltip={disabledButtonTooltip} show={!session.exists()}>
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
              </ConditionalTooltip>
            </li>
          </ul>
          <ul className="navbar-nav navbar-right">
            <li className="nav-item">
              <ConditionalTooltip tooltip={disabledButtonTooltip} show={!session.exists()}>
                <a
                  className={"nav-link" + (!session.exists() ? " disabled" : "")}
                  href="top"
                  onClick={() => this.sessionLogout()}
                >
                  Log Out
                </a>
              </ConditionalTooltip>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;

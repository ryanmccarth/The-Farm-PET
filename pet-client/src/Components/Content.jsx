import React, { Component } from "react";

import Login from "./Login";
import Read from "./ReadReviews";
import Request from "./Requests";
import Write from "./Write";

class Content extends Component {
  displayContent() {
    if (this.props.page === "login") {
      return (
        <Login
          updateSession={this.props.updateSession}
          updateContent={this.props.updateContent}
        />
      );
    }
    if (this.props.page === "read") {
      return <Read />;
    }
    if (this.props.page === "request") {
      return <Request />;
    }
    if (this.props.page === "write") {
      return <Write />;
    }
  }
  render() {
    return this.displayContent();
  }
}

export default Content;

import React, { Component } from "react";

import Login from "./Login";
import Read from "./ReadReviews";
import Request from "./RequestReviews";
import Write from "./WriteReviews";

class Content extends Component {
  state = {
    contentValue: ""
  };

  componentDidMount() {
    state.contentValue = this.props.contentValue;
  }

  displayContent(){
    if(this.state==="login"){
        return <Login />;
    }
    if(this.state==="read"){
        return <Read />;
    }
    if(this.state==="request"){
        return <Request />;
    }
    if(this.state==="write"){
        return <Write />;
    }
  }
  render() {
    return {displayContent()};
  }
}

export default Content;

import React, { Component } from "react";
import "./App.css";

import Nav from "./Components/NavBar";
import Cont from "./Components/Content";

class App extends Component {
  state = {
    currentPage: "login"
  };

  updateContent(navDestination) {
    this.currentPage = navDestination;
  }

  render() {
    return (
      <React.Fragment>
        <NavBar page={this.currentPage} update={this.updateContent} />
        <Cont page={this.currentPage} />
      </React.Fragment>
    );
  }
}

export default App;

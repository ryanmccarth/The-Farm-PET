import React, { Component } from "react";
import "./App.css";

import Nav from "./Components/NavBar";
import Cont from "./Components/Content";

class App extends Component {
  state = {
    currentPage: "login"
  };

  updateContent = navDestination => {
    this.setState({ currentPage: navDestination });
  };

  render() {
    return (
      <React.Fragment>
        <Nav page={this.state.currentPage} update={this.updateContent} />
        <Cont page={this.state.currentPage} />
      </React.Fragment>
    );
  }
}

export default App;

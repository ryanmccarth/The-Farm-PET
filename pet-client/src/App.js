import React, { Component } from "react";
import "./App.css";

import Nav from "./Components/NavBar";
import Cont from "./Components/Content";
import session from "./session";

class App extends Component {
  state = {
    currentPage: session.exists() ? "read" : "login",
    session: session,
  };

  updateContent = (navDestination) => {
    this.setState({ currentPage: navDestination });
  };
  updateSession = (session) => {
    this.setState({ session: session });
  };

  render() {
    return (
      <React.Fragment>
        <Nav
          page={this.state.currentPage}
          updateContent={this.updateContent}
          updateSession={this.updateSession}
        />
        <Cont
          page={this.state.currentPage}
          updateContent={this.updateContent}
          updateSession={this.updateSession}
        />
      </React.Fragment>
    );
  }
}

export default App;

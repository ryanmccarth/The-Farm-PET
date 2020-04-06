import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import "./temp/Requests.css";

/*
Contains everything for a user to request reviews. Specifically, under this component, other components include:
    2 List components (search list, selected list)
        List items (filled with information specific to each employee, might need to separate different types of list items for the specific lists)   
    Submit Button

*/

class Requests extends Component {
  state = {
    employees1: [
      { name: "Oscar Gibson" },
      { name: "Aaron Wright" },
      { name: "Trifon Trifonov" },
      { name: "Zachary Williams" },
      { name: "Stephan Lensky" },
      { name: "Ryan McCarthy" },
      { name: "Alden Burgess" },
      { name: "Rishikumar Jambunathan" },
      { name: "Todd Dvorsky" },
      { name: "Evan Besser" },
    ],

    employees2: [],
    columns1: [
      {
        dataField: "name",
        text: "Employee Name",
        headerStyle: { width: "100%", backgroundColor: "#eee", color: "#000" },
      },
    ],

    columns2: [
      {
        dataField: "name",
        text: "Selected Employees",
        headerStyle: { width: "100%", backgroundColor: "#eee", color: "#000" },
      },
    ],

    successMessageVisible: false,
    failedMessageVisible: false,
    selected: [],
  };

  //What happens when you click the submit button
  submit() {
    if (this.state.employees2.length !== 0) {
      this.setState({
        successMessageVisible: true,
        failedMessageVisible: false,
      });
      this.removeAllEmployees();
    } else {
      this.setState({
        successMessageVisible: false,
        failedMessageVisible: true,
      });
    }
  }

  //helper function for adding employees to second list
  addEmployee(employee) {
    var temp = this.state.employees2;
    temp.push(employee);
    this.setState({ employees2: temp });
    if (
      this.state.successMessageVisible === true ||
      this.state.failedMessageVisible === true
    ) {
      this.removeMessages();
    }
  }

  //helper function for removing employees from second list
  removeEmployee(employee) {
    var temp = this.state.employees2;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].name === employee.name) {
        temp.splice(i, 1);
      }
    }
    this.setState({ employees2: temp });
  }
  //helper function for Select All button
  addAllEmployees() {
    var temp = this.state.employees1.slice(0);
    var temp2 = this.state.employees1.map(function (employee) {
      return employee.name;
    });
    this.setState({ employees2: temp, selected: temp2 });
  }

  //helper function for unchecking Select All button
  removeAllEmployees() {
    this.setState({ employees2: [], selected: [] });
  }

  removeMessages() {
    this.setState({
      successMessageVisible: false,
      failedMessageVisible: false,
    });
  }

  render() {
    const { SearchBar } = Search;
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      selectColumnPosition: "right",
      bgColor: "#e3ffff",
      selected: this.state.selected,

      onSelect: (row, isSelect, rowIndex, e) => {
        if (isSelect) {
          let temp = this.state.selected.slice(0);
          temp.push(row.name);
          this.setState({ selected: temp });
          this.addEmployee(row);
        } else {
          let temp = this.state.selected.slice(0);
          temp = temp.filter(function (employee) {
            return employee !== row.name;
          });
          this.setState({ selected: temp });
          this.removeEmployee(row);
        }
      },

      onSelectAll: (isSelect, rows, e) => {
        if (isSelect) {
          this.addAllEmployees();
        } else {
          this.removeAllEmployees();
        }
      },
    };

    const rowStyle = {
      backgroundColor: "#fff",
    };

    return (
      <container>
        <div className="outer">
          <h4>Requesting a Peer Review</h4>
          <ToolkitProvider
            keyField="name"
            data={this.state.employees1}
            columns={this.state.columns1}
            search
          >
            {(props) => (
              <div className="table1">
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search name..."
                ></SearchBar>
                <BootstrapTable
                  {...props.baseProps}
                  hover
                  keyField="name"
                  data={this.state.employees1}
                  columns={this.state.columns1}
                  selectRow={selectRow}
                  rowStyle={rowStyle}
                />
              </div>
            )}
          </ToolkitProvider>

          <div className="table2">
            <BootstrapTable
              hover
              keyField="name"
              data={this.state.employees2}
              columns={this.state.columns2}
              rowStyle={rowStyle}
            />
            <div className="button">
              <Button
                variant="primary"
                type="submit"
                onClick={() => this.submit()}
              >
                Submit Requests
              </Button>
              <div className="alerts">
                <Alert
                  variant="success"
                  show={this.state.successMessageVisible}
                >
                  Success! Requests submitted.
                </Alert>
                <Alert variant="danger" show={this.state.failedMessageVisible}>
                  Select employees before submitting.
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </container>
    );
  }
}

export default Requests;

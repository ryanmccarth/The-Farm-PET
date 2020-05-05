import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from "react-bootstrap/Container";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import session from "../session";

import "raleway-webfont";
import './temp/General.scss';
import './temp/Requests.css';

/*
Contains everything for a user to request reviews. Specifically, under this component, other components include:
    2 List components (search list, selected list)
        List items (filled with information specific to each employee, might need to separate different types of list items for the specific lists)
    Submit Button
*/

class Requests extends Component {
  constructor(props){
    super(props);
    this.getEmployees();
    this.getSentRequests();
    }
    state = {

      //left table
      employees1: [],

      //right table
      employees2: [],

      //selected list, so that we can uncheck the boxes upon submission
      selected: [],
      nonSelectable: [],

      columns1: [
        {dataField: 'name',text: 'Employee Name',headerStyle: { width: '100%', /*backgroundColor: '#eee', color: '#000'*/}}
        ],

      columns2: [
        {dataField: 'name',text: 'Selected Employees',headerStyle: { width: '100%', /*backgroundColor: '#eee', color: '#000'*/}},
        {dataField: 'removeButton', text: this.clearAllButton(), formatter: this.buttonFormatter.bind(this), headerStyle: (colum, colIndex) => {
          return { width: '50%', textAlign: 'center' };
        }}
        ],

        successMessageVisible: false,
        failedMessageVisible: false,
    }

    clearAll(){
      this.setState({employees2: [], selected: []});
    }
    clearAllButton(){
      return(
        <div className="clearAll">
          <Button 
            className="themeLighterRed fontRaleway colorDark buttonOutlineDark"
            onClick={()=>this.clearAll()}>
              Clear
          </Button>
        </div>
      );
    }

    buttonFormatter(cellContent, row, rowIndex, extraData){
      return(
      <div className="removeButton">
          <Button 
            className="themeLighterRed fontRaleway colorDark buttonOutlineDark"
            onClick={()=>this.removeEmployee(row)}
          >
            x
          </Button>
      </div>);
  }

    async getSentRequests(){
      var url = 'api/request/' + session.userId;
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });
      let requestsSent = await res.json();
      while(!Array.isArray(requestsSent));
      requestsSent = requestsSent.map(function(employee){return employee.id;});
      this.setState({nonSelectable: requestsSent});
    }

    

    //function that initializes list of employees
    async getEmployees(){
      var url = 'api/companies/' + session.companyId + '/users';
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });
      let employees = await res.json();

      /* this isn't necessary because await already does that */
      //wait for the Promise to resolve first
      while(!Array.isArray(employees));

      employees = employees.filter(function(employee){return employee.id !== session.userId;})
      //then initialize the table
      this.setState({employees1: employees});
    }

    //What happens when you click the submit button
    async submit(){
      if(this.state.employees2.length !== 0){
        let res = await fetch('/api/request', {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({employeesList: this.state.employees2, userid: session.userId}),
        });
        var temp = this.state.nonSelectable.slice(0);
        var i = this.state.selected.length;
        var j = 0;
        while(j<i){
          temp.push(this.state.selected[j]);
          j++;
        }
        this.setState({employees2: [], selected: [], nonSelectable: temp, successMessageVisible: true, failedMessageVisible: false});
      }
      else{
        this.setState({successMessageVisible: false, failedMessageVisible: true});
      }
    }

    //helper function for adding employees to second list
    addEmployee(employee){
      var temp = this.state.employees2.slice(0);
      var temp2 = this.state.selected.slice(0);
      temp.push(employee);
      temp2.push(employee.id);
      this.setState({employees2: temp, selected: temp2});
      if(this.state.successMessageVisible === true || this.state.failedMessageVisible === true){
        this.removeMessages();
      }
    }

    //helper function for removing employees from second list
    removeEmployee(employee){
      var temp = this.state.employees2.slice(0);
        for(var i = 0; i<temp.length; i++){
          if(temp[i].id===employee.id){
            temp.splice(i, 1);
          }
        }

        var temp2 = this.state.selected.slice(0);
        for(var j = 0; j<temp2.length; j++){
          if(temp2[j]===employee.id){
            temp2.splice(j, 1);
          }
        }

        this.setState({employees2: temp, selected: temp2});
    }

    addAllEmployees(employees){
      var temp = this.state.employees2.slice(0);
      var temp2 = this.state.selected.slice(0);
      var i = 0;
      while(i<employees.length){
        temp.push(employees[i]);
        temp2.push(employees[i].id);
        i++;
      }
      this.setState({employees2: temp, selected: temp2});
      if(this.state.successMessageVisible === true || this.state.failedMessageVisible === true){
        this.removeMessages();
      }
    }

    //helper function for unchecking Select All button
    removeAllFromPage(employees){
      var temp = this.state.employees2.slice(0);
      var temp2 = this.state.selected.slice(0);
      temp = temp.filter(function(employee){
        var i = 0;
        while(i < employees.length){
          if(employees[i].id === employee.id){
            return false;
          }
          i++;
        }
        return true;
      });

      temp2 = temp2.filter(function(employee){
        var j = 0;
        while(j < employees.length){
          if(employees[j].id === employee){
            return false;
          }
          j++;
        }
        return true;
      });
      this.setState({employees2: temp, selected: temp2});
    }

    removeMessages(){
      this.setState({successMessageVisible: false, failedMessageVisible: false});
  }


    render() {

      const myPageButtonRenderer = ({
        page,
        active,
        disabled,
        title,
        onPageChange
      }) => {
        const handleClick = (e) => {
          e.preventDefault();
          onPageChange(page);
        };

        return (
          <li className="page-item fontRaleway">
            <a href="#" className={("page-link "+(active ? 'themeRed ' : 'themeWhite ')+"buttonOutlineDark colorDark")} onClick={ handleClick }>{ page }</a>
          </li>
        );
      };


      //className="fontRaleway themeLighterRed buttonOutlineDark colorDark"

      const pagination = paginationFactory({
      hidePageListOnlyOnePage: true,
      hideSizePerPage: true,
      pageButtonRenderer: myPageButtonRenderer
      });

      const { SearchBar, ClearSearchButton } = Search;
      const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        selectColumnPosition: 'right',
        //bgColor: '#e3ffff',
        style: {backgroundColor: '#3b3b3b', color: 'white'},
        selected: this.state.selected,
        nonSelectable: this.state.nonSelectable,
        //nonSelectableStyle: {backgroundColor: '#ffffbf !important', }, Note: I moved this to the stylesheet -Trifon
        nonSelectableClasses: "nonSelectableRow",


        onSelect: (row, isSelect, rowIndex, e) => {
          if(isSelect){
            this.addEmployee(row);
        }
          else{
            this.removeEmployee(row);
        }},

        onSelectAll: (isSelect, rows, e) => {
          if(isSelect){
            this.addAllEmployees(rows);
          }
          else{
            this.removeAllFromPage(rows);
          }
        }
      };

      // const rowStyle = {
      //   backgroundColor: '#fff'
      // };

      // const rowClasses = (row, rowIndex) => {
      //   return ((this.state.nonSelectable[rowIndex] ? '' : "tableRowProperty"));
      // };

      return (
        <Container fluid className="themeLighterGray w-100 windowDiv">
          <div className='outer fontRaleway'>
            <h4 className="indentHeading">Requesting a Peer Review</h4>
            <Container className="row justify-content-center" style={{margin: "0 auto"}}>
              <ToolkitProvider
                keyField='name'
                data={ this.state.employees1 }
                columns={ this.state.columns1 }
                search
              >{
              props => (
              <div className='table1'>
                <SearchBar {...props.searchProps} placeholder='Search name...'></SearchBar>
                <ClearSearchButton { ...props.searchProps } class = 'Button'/>
                <div className='table1Shell'>
                  <BootstrapTable  {...props.baseProps}
                    striped
                    hover
                    keyField='id'
                    data={ this.state.employees1 }
                    columns={ this.state.columns1 }
                    selectRow={ selectRow }
                    headerClasses="themeDarkerGray colorWhite"
                    bodyClasses="tableRowStyle tableHover"
                    rowClasses="tableRowProperty"//{rowClasses}
                    //rowStyle={rowStyle}
                    pagination={ pagination }
                  />
                </div>
              </div>
              )}
              </ToolkitProvider>
              <div className='table2'>
                <div className='table2Shell'>
                  <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={ this.state.employees2 }
                    columns={ this.state.columns2 }
                    //rowStyle={rowStyle} I implemented the style using the tableRowStyle class -Trifon
                    headerClasses="themeDarkerGray colorWhite"
                    bodyClasses="tableRowStyle2 tableHover"
                    rowClasses=""
                  />
                </div>
                <div className="button">
                  <Button className="themeLighterRed fontRaleway colorDark buttonOutlineDark" variant="primary" type="submit"
                  onClick={() => this.submit()}>
                  Submit Requests</Button>
                  <div className='alerts'>
                    <Alert variant='success' show={this.state.successMessageVisible}>Success! Requests submitted.</Alert>
                    <Alert variant='danger' show={this.state.failedMessageVisible}>Select employees before submitting.</Alert>
                  </div>
                </div>
              </div>
            </Container>
            <div className = 'help fontRaleway colorDark'><h5>* Yellow-colored names mean that you already have a pending request for your peer.</h5></div>
          </div>
        </Container>
      );
    }
  }

export default Requests;
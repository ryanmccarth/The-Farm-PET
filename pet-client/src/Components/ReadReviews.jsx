import React from 'react';
import './temp/ReadContent.css';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import session from "../session";


class ReadReviews extends React.Component {

    constructor(props){
        super(props);

        const columns = [   //Declare column labels and styling
            {dataField: 'writtenBy', text: 'Reviewers', headerStyle: {width: '15%', backgroundColor: '#eee', color: '#000'}},
            {dataField: 'writtenFor', text: 'Recipients', headerStyle: {width: '15%', backgroundColor: '#eee', color: '#000'}, searchable: false},
            {dataField: 'reviewText', text: 'Reviews', formatter: (cell, obj) => {return(cell.substr(0,80))}, //formatter allows for truncation
            headerStyle: {width: '45%', backgroundColor: '#eee', color: '#000'}, searchable: false},
            {dataField: 'lastUpdated', text: 'Date', formatter: (cell, obj) => {return(cell.substr(0,10))}, 
            headerStyle: {width: '10%', backgroundColor: '#eee', color: '#000'}, searchable: false}
        ]
        this.getReviews()

        this.state = {
            fetch: false,
            clicked: -1,
            showReview: false,
            columns,
            myData: []
        }
        this.handlerClick = this.handlerClick.bind(this);
    }

    async getReviews(){
        let res = await fetch(`/api/user/${session.userId}/reviews`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        });
        let reviews = await res.json();
        console.log(reviews)
  
        //wait for the Promise to resolve first
        while(!Array.isArray(reviews));
        //then initialize the table
        this.setState({myData: reviews});
    }

    componentDidMount(){    //Adding this fixed a double-rendering issue, where a previous component state would be rendered.
        this.setState({fetch: true})
    }

    handlerClick(row){
        this.setState({clicked: row, showReview: !this.state.showReview})
    }
    render(){
        const rowEvents = { //do this on rowClick
            onClick: (e, row, rowIndex) => {
                this.handlerClick(row)
            }
        };

        const { SearchBar, ClearSearchButton } = Search;

        const Extract = (props) => {
            if(props.fetch){    //ensure React is rendering correctly
                if(!props.showReview){  //detect whether a full review should be showing or not
                    return(
                        <div>
                            <div class = 'SearchbarSpacing'>
                                <h4>Your Reviews</h4>
                            </div>
                            <ToolkitProvider    //provides search functionality
                                keyField = 'writtenBy'
                                data = {this.state.myData}
                                columns = {this.state.columns}
                                search
                            >{ props => (
                                <div>
                                    <div class = 'SearchbarSpacing'>
                                        <SearchBar {...props.searchProps} placeholder = "Search Reviewer..."/>
                                        <ClearSearchButton { ...props.searchProps } />
                                    </div>
                                    <hr/>
                                    <div class = 'TableSize'>
                                        <BootstrapTable {...props.baseProps}
                                            striped
                                            hover
                                            rowEvents = {rowEvents}
                                            keyField = 'writtenBy'
                                            data = {this.state.myData}
                                            columns = {this.state.columns}
                                        ></BootstrapTable>
                                    </div>
                                </div>
                            )
                            }</ToolkitProvider>
                        </div>
                    )
                }
                return(
                    <div>
                        <p class = "FullReview">
                            {props.clicked.reviewText}
                            <hr />
                            <Button variant = "primary" onClick = {() => this.handlerClick(-1)}>Return</Button>
                        </p>
                    </div>)
            }
            else{
                return( <p>loading...</p>);
            }
        }
        return(
            <Extract clicked = {this.state.clicked} fetch = {this.state.fetch} showReview = {this.state.showReview} ></Extract>
        );
    }
}

export default ReadReviews;
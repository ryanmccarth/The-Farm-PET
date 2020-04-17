import React from 'react';
import './temp/ReadContent.css';
import data from './temp/sample.json';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

class ReadReviews extends React.Component {
    constructor(props){
        super(props);

        const columns = [   //Declare column labels and styling
            {dataField: 'reviewer', text: 'Reviewers', headerStyle: {width: '15%', backgroundColor: '#eee', color: '#000'}},
            {dataField: 'recipient', text: 'Recipients', headerStyle: {width: '15%', backgroundColor: '#eee', color: '#000'}, searchable: false},
            {dataField: 'fullreview', text: 'Reviews', formatter: (cell, obj) => {return(cell.substr(0,80))}, //formatter allows for truncation
            headerStyle: {width: '45%', backgroundColor: '#eee', color: '#000'}, searchable: false},
            {dataField: 'date', text: 'Date', headerStyle: {width: '10%', backgroundColor: '#eee', color: '#000'}, searchable: false}
        ]

        this.state = {
            fetch: false,
            clicked: -1,
            showReview: false,
            columns
        }
        this.handlerClick = this.handlerClick.bind(this);
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
                                keyField = 'reviewer'
                                data = {data}
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
                                            keyField = 'reviewer'
                                            data = {data}
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
                            {props.clicked.fullreview}
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
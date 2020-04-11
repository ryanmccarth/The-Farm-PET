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
            {dataField: 'fullreview', text: 'Reviews', headerStyle: {width: '45%', backgroundColor: '#eee', color: '#000'}, searchable: false},
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
    componentDidMount(){
        this.setState({fetch: true})
    }

    handlerClick(index){
        this.setState({clicked: index, showReview: !this.state.showReview})
    }
    render(){
        const rowEvents = { //do this on rowClick
            onClick: (e, row, rowIndex) => {
                this.handlerClick(rowIndex)
            }
        };

        const { SearchBar, ClearSearchButton } = Search;

        const Extract = (props) => {
            if(props.fetch){    //ensure React is rendering correctly
                if(!props.showReview){  //detect whether a full review should be showing or not
                    return(
                        <div>
                            <h4>Your Reviews</h4>
                            <ToolkitProvider    //provides search functionality
                                keyField = 'reviewer'
                                data = {data}
                                columns = {this.state.columns}
                                search
                            >{ props => (
                                <div>
                                    <SearchBar {...props.searchProps} placeholder = "Search Reviewer..."/>
                                    <ClearSearchButton { ...props.searchProps } />
                                    <hr/>
                                    <div class = 'Scroll'>
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
                        {data.map((info, index) => {   
                            if(props.clicked === index){    //only want to show the review that was clicked
                                return<div>
                                    <p class="FullReview">{info.fullreview}</p>
                                    <Button variant = "primary" onClick = {() => this.handlerClick(-1)}>Return</Button>
                                </div>
                            }
                            return null
                        })}
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
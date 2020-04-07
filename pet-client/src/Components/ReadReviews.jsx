import React from 'react';
import './temp/ReadContent.css';
import data from './temp/sample.json';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class ReadReviews extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fetch: false,
            clicked: -1,
            showReview: false
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

        const buttonStyle = {
            marginRight: '10px',
            backgroundColor: '#2593F2',
            border: '1px solid black',
            boxShadow: '2px 2px blue',
            borderRadius: '5px'
        };
        const Extract = (props) => {
            if(props.fetch){
                if(!props.showReview){
                    return(
                        <div>
                            <Table striped="true" bordered="true" hover="true">
                                <thead>
                                    <tr>
                                        <th dataField="reviewer">Reviewer</th>
                                        <th dataField="recipient">Recipient</th>
                                        <th dataField="fullreview">Review</th>
                                        <th dataField="date">Date</th>
                                    </tr>
                                </thead>
                                {data.map((info, index) => {                       
                                    return<tr class="inboxrow" hover striped>
                                        <td>{info.recipient}</td>
                                        <td>{info.reviewer}</td>
                                        <td>{info.fullreview.substr(0,130)}...</td>
                                        <td>{info.date}</td>
                                        <td>
                                            <button style = {buttonStyle} onClick = {() => this.handlerClick(index)}>open</button>
                                        </td>
                                    </tr>
                                })}
                            </Table>
                        </div>
                    )
                }
                return(
                    <div>
                        {data.map((info, index) => {   
                            if(props.clicked === index){
                                return<div>
                                    <p class="FullReview">{info.fullreview}</p>
                                    <button style = {buttonStyle} onClick = {() => this.handlerClick(-1)}>return</button>
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
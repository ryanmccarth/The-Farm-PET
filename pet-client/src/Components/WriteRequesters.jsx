import React, { Component } from "react";
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner';

import './temp/WriteRequesters.css'

const NoDataIndication = () => (
    <div style={{textAlign: "center", margin: "48px"}}>
        <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
);

const EmptyTable = (props) => (
    <BootstrapTable
    remote
    keyField='name'
    data={ [] }
    columns={ props.columns }
    noDataIndication={ () => <NoDataIndication /> }
    />
);

class WriteRequesters extends Component {
    state = {
        columns1: [
            // for implementation details, look at pet-api/routes/requests.js
            {dataField: 'name', text: 'Employee Name', headerStyle: { width: '100%', backgroundColor: '#eee', color: '#000'},},
            {dataField: 'userId', text: 'userId', hidden: true},
            {dataField: 'requestId', text:'requestId', hidden: true},
            {dataField: 'draftId', text:'draftId', hidden: true},  // will be -1 if no draft exists
            {dataField: 'rejectButton', text: 'Status', formatter: this.buttonFormatter.bind(this), formatExtraData: this.deleteButtonClick.bind(this)}
        ],
        selected: null, // will be a "row" element. This means it will have above fields
    };

    buttonFormatter(cellContent, row, rowIndex, extraData){
        //this.setState({selected: row});  // maybe problem?
        return(
        <div className="reject-button">
            <Button
             variant='danger'
             onClick={()=>extraData(row)}
            >
                Reject
            </Button>
        </div>);
    }

    deleteButtonClick(row){
        this.setState({selected: row});
        console.log(`is it null? ${row==null}`);
        this.props.onDeleteButton(row.requestId, row.name, row.draftId);
        //this.render();
    }

    writeButtonClick(e) {
        this.props.onRequestSelect(this.state.selected)
    }

    render() {
        const pagination = paginationFactory({
            hidePageListOnlyOnePage: true,
            hideSizePerPage: true,
        });

        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            selectColumnPosition: 'left',
            bgColor: '#e3ffff',

            onSelect: (row, isSelect, rowIndex, e) => {
                if(isSelect){
                    this.setState({selected: row});
                }
            },
        };

        const writeButton = (
            <Button
            style={this.state.selected === null || this.props.isLoading ? { pointerEvents: 'none' } : {}}
            variant = "primary"
            type = "button"
            onClick = {this.writeButtonClick.bind(this)}
            disabled={this.state.selected === null || this.props.isLoading}>
                Write Review
            </Button>
        )

        if (this.props.requests === undefined || this.props.requests.length) {
            return (
                <div id="writeRequesterContainer">
                    <h4>The following users have requested your review</h4>
                    <p>Please select an employee to write a review for them.</p>
                    <div id='requesterTable'>
                    { this.props.requests === undefined
                    ? <EmptyTable columns={ this.state.columns1 } />
                    : <BootstrapTable
                        hover
                        keyField='name'
                        data={ this.props.requests }
                        columns={ this.state.columns1 }
                        selectRow={ selectRow }
                        //rowStyle={rowStyle}
                        rowClasses={this.draftEntryNameFormat}
                        pagination={ pagination }
                        bootstrap4/>
                    }
                    </div>
                    <div id="writeBtnContainer">
                        {this.state.selected === null
                            ? <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Select a user to write a review</Tooltip>}>
                                <span className="d-inline-block">
                                  {writeButton}
                                </span>
                              </OverlayTrigger>
                            : writeButton}
                    </div>

                </div>
            );
        } else {
            return (
                <div id="writeRequesterContainer">
                    <h4>No users have requested your review at this time</h4>
                    <p>Please check back later.</p>
                </div>
            );
        }

    }

    // Purpose: mark every request that has a draft associated with it by a darker color (user's sake)
    // sets classname to "draftentry", referenced CSS file at top styles it
    draftEntryNameFormat(row, rowIdx) {
        if (row.draftId !== -1) {
          return 'draftentry'
        }
        else return 'nondraftentry';
    }

}

export default WriteRequesters

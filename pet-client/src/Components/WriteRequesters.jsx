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

const rowStyle = {
    backgroundColor: '#fff'
};

const EmptyTable = (props) => (
    <BootstrapTable
    remote
    keyField='name'
    data={ [] }
    columns={ props.columns }
    rowStyle={rowStyle}
    noDataIndication={ () => <NoDataIndication /> }
    />
);

class WriteRequesters extends Component {
    state = {
        columns1: [
            {dataField: 'name',text: 'Employee Name',headerStyle: { width: '100%', backgroundColor: '#eee', color: '#000'},},
            {dataField: 'userId',text: 'userId', hidden: true},
        ],
        selected: null,
    };

    writeButtonClick(e) {
        this.props.onRequesterSelect(this.state.selected)
    }

    render() {
        const pagination = paginationFactory({
            hidePageListOnlyOnePage: true,
            hideSizePerPage: true,
        });

        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            selectColumnPosition: 'right',
            bgColor: '#e3ffff',

            onSelect: (row, isSelect, rowIndex, e) => {
                if(isSelect){
                    this.setState({selected: row});
                }
            },
        };

        const writeButton = (
            <Button
            style={this.state.selected === null ? { pointerEvents: 'none' } : {}}
            variant = "primary"
            type = "button"
            onClick = {this.writeButtonClick.bind(this)}
            disabled={this.state.selected === null}>
                Write Review
            </Button>
        )

        if (this.props.employees === undefined || this.props.employees.length) {
            return (
                <div id="writeRequesterContainer">
                    <h4>The following users have requested your review</h4>
                    <p>Please select an employee to write a review for them.</p>
                    <div id='requesterTable'>
                    { this.props.employees === undefined
                    ? <EmptyTable columns={ this.state.columns1 } />
                    : <BootstrapTable
                        hover
                        keyField='name'
                        data={ this.props.employees }
                        columns={ this.state.columns1 }
                        selectRow={ selectRow }
                        rowStyle={rowStyle}
                        pagination={ pagination }
                      />
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

}

export default WriteRequesters
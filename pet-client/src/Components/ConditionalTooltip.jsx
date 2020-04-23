import React, { Component } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class ConditionalTooltip extends Component {
    render() {
        return this.props.show
            ? (<OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">{this.props.tooltip}</Tooltip>}>
                <span className="d-inline-block">
                  {this.props.children}
                </span>
              </OverlayTrigger>)
            : this.props.children;
    }
}

export default ConditionalTooltip;

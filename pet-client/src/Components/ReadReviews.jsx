import React from "react";
import "./temp/ReadContent.css";
import data from "./temp/sample.json";

class ReadReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: false,
      clicked: -1,
      showReview: false
    };
    this.handlerClick = this.handlerClick.bind(this);
  }
  componentDidMount() {
    this.setState({ fetch: true });
  }

  handlerClick(index) {
    this.setState({ clicked: index, showReview: !this.state.showReview });
  }

  render() {
    const tableStyle = {
      tableLayout: "auto",
      width: "70%",
      marginLeft: "350px",
      marginTop: "80px",
      paddingRight: "200px",
      borderRadius: "5px",
      backgroundColor: "#8C8994"
    };
    const buttonStyle = {
      marginRight: "10px",
      backgroundColor: "#2593F2",
      border: "1px solid black",
      boxShadow: "2px 2px blue",
      borderRadius: "5px"
    };
    const Extract = props => {
      if (props.fetch) {
        if (!props.showReview) {
          return (
            <div>
              <table style={tableStyle}>
                <div class="Scroll">
                  <tr class="Label">
                    <th>Recipient</th>
                    <th>Reviewer</th>
                    <th>Review</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                  {data.map((info, index) => {
                    return (
                      <tr>
                        <td class="DataSpacing">{info.recipient}</td>
                        <td class="DataSpacing">{info.reviewer}</td>
                        <td class="DataSpacing">{info.review}</td>
                        <td class="DataSpacing">{info.date}</td>
                        <td class="DataSpacing">
                          <button
                            style={buttonStyle}
                            onClick={() => this.handlerClick(index)}
                          >
                            open
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </div>
              </table>
            </div>
          );
        }
        return (
          <div>
            {data.map((info, index) => {
              if (props.clicked === index) {
                return (
                  <div>
                    <p>{info.fullReview}</p>
                    <button
                      style={buttonStyle}
                      onClick={() => this.handlerClick(-1)}
                    >
                      return
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      } else {
        return <p>loading...</p>;
      }
    };
    return (
      <Extract
        clicked={this.state.clicked}
        fetch={this.state.fetch}
        showReview={this.state.showReview}
      ></Extract>
    );
  }
}

export default ReadReviews;

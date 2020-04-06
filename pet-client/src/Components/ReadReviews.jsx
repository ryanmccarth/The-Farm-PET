import React from "react";
import "./temp/ReadContent.css";
import data from "./temp/sample.json";
import Button from "react-bootstrap/Button";

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
    const Extract = props => {
      if (props.fetch) {
        if (!props.showReview) {
          return (
            <div>
              <h1>Your Reviews:</h1>
              <div class = "TableSize">
                <table class = "TableStyle">
                  <div class = "Scroll">
                  <thead>
                    <tr class="Label">
                      <th>Recipient</th>
                      <th>Reviewer</th>
                      <th class = "Review">Review</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                    {data.map((info, index) => {
                      return (
                        <tbody>
                        <tr>
                          <td class="DataSpacing">{info.recipient}</td>
                          <td class="DataSpacing">{info.reviewer}</td>
                          <td class="DataSpacing">{info.review}</td>
                          <td class="DataSpacing">{info.date}</td>
                          <td class="DataSpacing">
                            <Button variant = "primary"
                              onClick={() => this.handlerClick(index)}
                            >
                              Open
                            </Button>
                          </td>
                        </tr>
                        </tbody>
                      );
                    })}
                    </div>
                </table>
              </div>
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
                    <Button variant = "primary"
                      onClick={() => this.handlerClick(-1)}
                    >
                      Return
                    </Button>
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
import React from "react";
import tips from "../tipsFile";
class Tips extends React.Component {
  constructor() {
    super();
    this.state = {
      number: null,
      tip: "",
      color: null,
    };
  }

  componentDidMount() {
    this.pickRandomQuote();
  }

  pickRandomQuote = (e) => {
    let randomNumber = Math.floor(Math.random() * (tips.length - 1));
    if (this.state.number === randomNumber) {
      this.pickRandomQuote();
    } else {
      this.setState({ tip: tips[randomNumber] });
      this.setState({ number: randomNumber });
      this.pickRandomColor();
    }
  };
  pickRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    if (this.state.color === randomColor) {
      this.pickRandomColor();
    } else {
      this.setState({ color: randomColor });
    }
  };

  render() {
    return (
      <div className="background">
        <div
          style={{
            backgroundColor: this.state.color,
            width: "300px",
            height: "300px",
          }}
          className="bg-white tc br3 qouteBox"
        >
          <h1>{this.state.tip}</h1>

          <div className="divButton">
            <button
              type="submit"
              onClick={this.pickRandomQuote}
              className="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib white"
            >
              give me a random tip!
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Tips;

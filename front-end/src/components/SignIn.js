import React from "react";
import { withRouter } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  onSubmitSignIn = () => {
    fetch("http://localhost:4000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((userdata) => {
        console.log("userdata", userdata);
        this.props.loadUser(userdata);
        this.props.history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <>
        <div className="container">
          <h2>Sign In</h2>
          <div className="inputBox">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={this.onEmailChange}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={this.onPasswordChange}
            />
          </div>

          <button className="submitButton" onClick={this.onSubmitSignIn}>
            Sign In
          </button>
        </div>
      </>
    );
  }
}
export default withRouter(Signin);

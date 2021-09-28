import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  onSubmitSignIn = () => {
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log("user", user);
        this.props.loadUser(user);
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <>
        <div className="container">
          <h2>Register</h2>
          <div className="inputBox">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={this.onNameChange}
            />
          </div>
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
            Register
          </button>
        </div>
      </>
    );
  }
}

export default Register;

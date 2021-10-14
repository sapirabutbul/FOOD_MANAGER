import React from "react";

class DeleteUser extends React.Component {
  onSubmitDelete = () => {
    if (this.props.user.email) {
      fetch("https://food-manager-react.herokuapp.com/delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: this.props.user.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {})
        .then((data) => {
          this.props.loadUser({
            user: {
              id: null,
              name: null,
              email: null,
              joined: null,
            },
            token: null,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }

    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <div className="container">
          <h2>Delete Account</h2>
          <h3>are you sure?</h3>
          <h3> you can cancel what you are going to do..</h3>
          <button className="submitButton" onClick={this.onSubmitDelete}>
            Delete
          </button>
        </div>
      </>
    );
  }
}
export default DeleteUser;

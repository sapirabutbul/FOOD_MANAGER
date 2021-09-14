// import React from "react";

// class DeleteUser extends React.Component {
//   onSubmitDelete = () => {
//     if (this.props.user.email) {
//       fetch("http://localhost:4000/delete", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           email: this.props.user.email,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("data", data);
//         })
//         .then((data) => {
//           this.props.loadUser({
//             user: {
//               id: null,
//               name: null,
//               email: null,
//               joined: null,
//             },
//             token: null,
//           });
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }

//     this.props.history.push("/");
//   };
//   render() {
//     return (
//       <>
//         <h2>Delete User</h2>
//         <input type="submit" onClick={this.onSubmitDelete} value="Delete" />
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     name: state.userReducer.name,
//     email: state.userReducer.email,
//     id: state.userReducer.user_id,
//   };
// };
// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     uploadUser: (e) => dispatch(uploadUser(e)),
// //   };
// // };
// export default connect(mapStateToProps, null)(DeleteUser);

import React from "react";

class DeleteUser extends React.Component {
  onSubmitDelete = () => {
    if (this.props.user.email) {
      fetch("http://localhost:4000/delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: this.props.user.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
        })
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
        <h2>Delete User</h2>
        <input type="submit" onClick={this.onSubmitDelete} value="Delete" />
      </>
    );
  }
}
export default DeleteUser;

import React from "react";
import { connect } from "react-redux";

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log("points", this.props.points);
    const { name } = this.props;
    return (
      <div>
        <h2>My Kitchen</h2>
        <h4>Hello {name},What are we going to cook today?</h4>
        <h3>My Points: {this.props.userPoints}</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name,
    email: state.userReducer.email,
    id: state.userReducer.user_id,
    userPoints: state.userReducer.userPoints,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     uploadUser: (e) => dispatch(uploadUser(e)),
//   };
// };
export default connect(mapStateToProps, null)(UserInfo);

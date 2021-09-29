import React from "react";
import { connect } from "react-redux";

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { name } = this.props;
    return (
      <>
        <h2 className="headers mt5">My Kitchen</h2>
        <div className="userinfo tc br3 pa2 dib bw2 shadow-5 w6">
          <h3>
            Hello {name},<br />
            What are we going to cook today?
          </h3>
          <h3>My Points: {this.props.userPoints}</h3>
        </div>
      </>
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

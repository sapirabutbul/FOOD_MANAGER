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
      <div>
        <h2>My Kitchen</h2>
        <h4>Hello {name}, Happy to see you today!</h4>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name,
    email: state.userReducer.email,
    id: state.userReducer.user_id,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     uploadUser: (e) => dispatch(uploadUser(e)),
//   };
// };
export default connect(mapStateToProps, null)(UserInfo);

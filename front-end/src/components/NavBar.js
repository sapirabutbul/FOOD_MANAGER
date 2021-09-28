import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NavBar = (props) => {
  const { token } = props;
  return (
    <>
      <nav>
        <Link className="link" to="/" style={{ margin: "5px" }}>
          Home
        </Link>
        <Link className="link" to="/profile" style={{ margin: "5px" }}>
          Profile
        </Link>
        <Link className="link" to="/about" style={{ margin: "5px" }}>
          About
        </Link>
        <Link className="link" to="/tips" style={{ margin: "5px" }}>
          Tips
        </Link>
        {!token ? (
          <Link className="link" to="/register" style={{ margin: "5px" }}>
            Register
          </Link>
        ) : null}
        {!token ? (
          <Link className="link" to="/signin" style={{ margin: "5px" }}>
            Sign In
          </Link>
        ) : null}

        {token ? (
          <Link className="link" to="/signout" style={{ margin: "5px" }}>
            Sign out
          </Link>
        ) : null}
        {token ? (
          <Link className="link" to="/delete" style={{ margin: "5px" }}>
            Delete Account
          </Link>
        ) : null}
      </nav>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchAllRecipes: (e) => dispatch(fetchAllRecipes(e)),
//   };
// };
export default connect(mapStateToProps, null)(NavBar);

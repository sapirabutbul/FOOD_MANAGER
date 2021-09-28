import { Link } from "react-router-dom";
import { connect } from "react-redux";
const NavBar = (props) => {
  const { token } = props;
  return (
    <>
      <nav className="bg-light-yellow db dt-l w-100 border-box pa2 ph5-l top-0 fixed">
        <Link to="/">
          <img
            src="https://www.pinclipart.com/picdir/big/86-862588_mobi-food-logo-gif-clipart.png"
            className="dib w3 h3 ma1"
          />
        </Link>
        <div className="db dtc-l v-mid w-50 w-25-l tc tl-l">
          <Link className="link dim dark-gray  f3-l dib mr3 mr4-l" to="/">
            Home
          </Link>
          <Link className="link dim dark-gray f4-l dib mr3 mr4-l" to="/profile">
            Profile
          </Link>
          <Link className="link dim dark-gray f4-l dib mr3 mr4-l" to="/about">
            About
          </Link>
          <Link className="link dim dark-gray f4-l dib mr3 mr4-l" to="/tips">
            Tips
          </Link>
        </div>
        <div className="db dtc-l v-mid w-75 w-50-l tc tr-l">
          {!token ? (
            <Link
              className="link dim dark-gray f4-l dib mr3 mr4-l"
              to="/register"
            >
              Register
            </Link>
          ) : null}
          {!token ? (
            <Link
              className="link dim dark-gray f4-l dib mr3 mr4-l"
              to="/signin"
            >
              Sign In
            </Link>
          ) : null}

          {token ? (
            <Link
              className="link dim dark-gray f4-l dib mr3 mr4-l"
              to="/signout"
            >
              Sign out
            </Link>
          ) : null}
          {token ? (
            <Link
              className="link dim dark-gray f4-l dib mr3 mr4-l"
              to="/delete"
            >
              Delete Account
            </Link>
          ) : null}
        </div>
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

// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

// const NavBar = (props) => {
//   const { token } = props;
//   return (
//     <>
//       <nav>
//         <Link className="link" to="/" style={{ margin: "5px" }}>
//           Home
//         </Link>
//         <Link className="link" to="/profile" style={{ margin: "5px" }}>
//           Profile
//         </Link>
//         <Link className="link" to="/about" style={{ margin: "5px" }}>
//           About
//         </Link>
//         <Link className="link" to="/tips" style={{ margin: "5px" }}>
//           Tips
//         </Link>
//         {!token ? (
//           <Link className="link" to="/register" style={{ margin: "5px" }}>
//             Register
//           </Link>
//         ) : null}
//         {!token ? (
//           <Link className="link" to="/signin" style={{ margin: "5px" }}>
//             Sign In
//           </Link>
//         ) : null}

//         {token ? (
//           <Link className="link" to="/signout" style={{ margin: "5px" }}>
//             Sign out
//           </Link>
//         ) : null}
//         {token ? (
//           <Link className="link" to="/delete" style={{ margin: "5px" }}>
//             Delete Account
//           </Link>
//         ) : null}
//       </nav>
//     </>
//   );
// };
// const mapStateToProps = (state) => {
//   return {
//     token: state.userReducer.token,
//   };
// };
// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     fetchAllRecipes: (e) => dispatch(fetchAllRecipes(e)),
// //   };
// // };
// export default connect(mapStateToProps, null)(NavBar);

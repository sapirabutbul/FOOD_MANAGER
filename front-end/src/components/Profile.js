// import React from "react";
// import withAuth from "../withAuth";
// import { Switch, Route, Link } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import FavoriteRecipes from "./FavoriteRecipes";
// import ProfileManu from "./ProfileManu";
// import ProfileRoute from "./ProfileRoute";
// import UploadRecipe from "./UploadRecipe";
// import UserInfo from "./UserInfo";
// import MyRecipes from "./MyRecipes";

// class Profile extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     const { path } = this.props.match;
//     console.log("profile props", this.props);
//     const { user, token } = this.props;
//     return (
//       <div>
//         <h2>Profile</h2>
//         <div>
//           <ProfileManu />
//           <ProfileRoute />
//         </div>
//         <MyRecipes />
//         <UploadRecipe />
//         {/* <div>
//           <UploadRecipe />
//           <MyRecipes />
//           <FavoriteRecipes />
//           <ShoppingList />
//         </div> */}
//       </div>
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
// export default connect(mapStateToProps, null)(Profile);

import React from "react";
import withAuth from "../withAuth";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import FavoriteRecipes from "./FavoriteRecipes";
import MyRecipes from "./MyRecipes";
import ShoppingList from "./ShoppingList";
import UploadRecipe from "./UploadRecipe";
import UserInfo from "./UserInfo";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("profile props", this.props);
    const { user, token } = this.props;
    return (
      <div>
        <h2>Profile</h2>
        <div>
          <Link
            className="link"
            to={`${this.props.match.url}/myrecipes`}
            style={{ margin: "5px" }}
          >
            My Recipes
          </Link>
          <Link
            className="link"
            to={`${this.props.match.url}/favoriterecipes`}
            style={{ margin: "5px" }}
          >
            Favorite Recipes
          </Link>
          <Link
            className="link"
            to={`${this.props.match.url}/uploadrecipe`}
            style={{ margin: "5px" }}
          >
            Upload a Recipe
          </Link>
        </div>
        <div>
          <UserInfo />
        </div>
        <div style={{ border: "1px solid blue", height: "500px" }}>
          <Switch>
            <Route
              path={`${this.props.match.path}/uploadrecipe`}
              component={withAuth(UploadRecipe, user, token)}
            />
            <Route
              path={`${this.props.match.path}/myrecipes`}
              render={() => <MyRecipes />}
            />
            <Route
              path={`${this.props.match.path}/favoriterecipes`}
              render={() => <FavoriteRecipes />}
            />

            {/* <Route
              path="/uploadrecipe"
              children={<UploadRecipe user={user} token={token} />}
            /> */}
          </Switch>
        </div>
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
export default connect(mapStateToProps, null)(withRouter(Profile));

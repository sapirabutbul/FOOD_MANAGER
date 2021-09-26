import React from "react";
import withAuth from "../withAuth";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLikesFavsInfo } from "../redux/actions";
import FavoriteRecipes from "./FavoriteRecipes";
import MyRecipes from "./MyRecipes";
import ShoppingList from "./ShoppingList";
import UploadRecipe from "./UploadRecipe";
import UserInfo from "./UserInfo";
import UserShopList from "./UserShopList";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchLikesFavsInfo();
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
          <Link
            className="link"
            to={`${this.props.match.url}/shoppinglist`}
            style={{ margin: "5px" }}
          >
            Shopping List Maker
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
            <Route
              path={`${this.props.match.path}/shoppinglist`}
              render={() => <ShoppingList />}
            />
            {/* <Route
              path={`${this.props.match.path}/usershoplist`}
              render={() => <UserShopList />}
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLikesFavsInfo: (e) => dispatch(fetchLikesFavsInfo(e)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));

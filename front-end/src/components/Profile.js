import React from "react";
import withAuth from "../withAuth";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLikesFavsInfo, fetchPoints } from "../redux/actions";
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
    this.props.fetchPoints();
  }
  render() {
    const { user, token } = this.props;
    return (
      <div>
        <div className="indexZ bg-gold db dt-l w-100 border-box pa3 ph5-l fixed">
          <Link
            className="link dim dark-gray  f4-l dib mr3 mr4-l"
            to={`${this.props.match.url}/myrecipes`}
            style={{ margin: "5px" }}
          >
            My Recipes
          </Link>
          <Link
            className="link dim dark-gray  f4-l dib mr3 mr4-l"
            to={`${this.props.match.url}/favoriterecipes`}
            style={{ margin: "5px" }}
          >
            Favorite Recipes
          </Link>
          <Link
            className="link dim dark-gray  f4-l dib mr3 mr4-l"
            to={`${this.props.match.url}/uploadrecipe`}
            style={{ margin: "5px" }}
          >
            Upload a Recipe
          </Link>
          <Link
            className="link dim dark-gray  f4-l dib mr3 mr4-l"
            to={`${this.props.match.url}/shoppinglist`}
            style={{ margin: "5px" }}
          >
            Shopping List Maker
          </Link>
        </div>
        <div className="">
          <div className="userInfoBox">
            <UserInfo />
          </div>
          <div className="flex">
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
              <Route
                path={`${this.props.match.path}/usershoplist`}
                render={() => <UserShopList />}
              />
            </Switch>
          </div>
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
    fetchPoints: () => dispatch(fetchPoints()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));

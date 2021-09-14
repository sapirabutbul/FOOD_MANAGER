import React from "react";

import { Switch, Route } from "react-router-dom";
import FavoriteRecipes from "./FavoriteRecipes";
import MyRecipes from "./MyRecipes";
import UploadRecipe from "./UploadRecipe";
class ProfileRoute extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Switch>
          {/* <Route
            path={`/uploadrecipe`}
            component={withAuth(UploadRecipe, user, token)}
          /> */}
          <Route path={`/myrecipes`} exact children={<MyRecipes />} />
          <Route
            path={`/favoriterecipes`}
            exact
            children={<FavoriteRecipes />}
          />
          {/* <Route
              path="/uploadrecipe"
              children={<UploadRecipe user={user} token={token} />}
            /> */}
        </Switch>
      </div>
    );
  }
}
export default ProfileRoute;

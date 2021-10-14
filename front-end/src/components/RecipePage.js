import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LikeFavButtons from "./LikeFavButtons";

class RecipesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likeButton: "Like",
      addToFavs: false,
      favsButton: "Add To Favorites",
    };
  }
  goBackHome = () => {
    this.props.history.goBack();
  };
  render() {
    const { oneRecipe, token } = this.props;

    if (!oneRecipe.length) {
      return (
        <>
          <h1>Loading...</h1>
          <h2>sorry, the server is a bit slow..</h2>
        </>
      );
    } else {
      const { title, ingredients, description, uploader_name, upload_date } =
        oneRecipe[0];
      let date = new Date(upload_date);
      let uploadDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      return (
        <>
          <div className="recipePage">
            <div className="likebuttonDiv">
              {token ? <LikeFavButtons /> : null}
            </div>
            <div className="recipeDiv">
              <h3>Recipe name:</h3> <h2 className="recipeHeader"> {title}</h2>
              <h3>ingredients:</h3>
              <ul>
                {JSON.parse(ingredients).map((element) => {
                  return (
                    <li>
                      {element.amount} {element.unit} {element.item}
                    </li>
                  );
                })}
              </ul>
              <h3>description:</h3>
              <p className="description">{description}</p>
              <h3>upload by: {uploader_name}</h3>
              <h3>upload date: {uploadDate}</h3>
              <h2>Bon Appetit!</h2>
            </div>
            <div className="buttonDiv">
              <button className="submitButton ml3" onClick={this.goBackHome}>
                Go Back
              </button>
            </div>
          </div>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name,
    id: state.userReducer.user_id,
    recipes: state.recipesReducer.recipes,
    oneRecipe: state.recipesReducer.oneRecipe,
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps, null)(withRouter(RecipesPage));

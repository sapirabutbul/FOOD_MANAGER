import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LikeFavButtons from "./LikeFavButtons";

class RecipesPage extends React.Component {
  goBackHome = () => {
    console.log("props", this.props);
    this.props.history.push("/");
  };
  render() {
    console.log("this props of recipe page", this.props);
    const { oneRecipe, token } = this.props;
    if (!oneRecipe.length) {
      return <p>Loading...</p>;
    } else {
      const { title, ingredients, description, uploader_name } = oneRecipe[0];
      // console.log(title, "title", ingredients);
      return (
        <>
          <div style={{ border: "2px solid blue" }}>
            <div>
              <div>
                {token ? <LikeFavButtons /> : null}
                {/* <button onClick={this.handleLike}>{likeButton}</button>
                <button onClick={this.handleFavs}>{favsButton}</button> */}
              </div>
              <h2>Recipe name: {title}</h2>
              <h3>ingredients:</h3>
              <ul>
                {JSON.parse(ingredients).map((element) => {
                  // console.log("element", element);
                  return (
                    <li>
                      {element.amount} {element.item}
                    </li>
                  );
                })}
              </ul>
              <h3>upload by: {uploader_name}</h3>
              <p>description:</p>
              <p>{description}</p>
            </div>
            <div>
              <button onClick={this.goBackHome}>Go Back</button>
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
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToFavorites: (e) => dispatch(addToFavorites(e)),
//   };
// };
export default connect(mapStateToProps, null)(withRouter(RecipesPage));

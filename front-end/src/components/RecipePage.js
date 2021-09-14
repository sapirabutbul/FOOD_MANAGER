import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LikeFavButtons from "./LikeFavButtons";

class RecipesPage extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     liked: false,
  //     likeButton: "Like",
  //     addToFavs: false,
  //     favsButton: "Add To Favorites",
  //   };
  // }
  // handleLike = (e) => {
  //   if (this.state.liked) {
  //     this.setState({ liked: false });
  //     this.setState({ likeButton: "Like" });
  //   } else {
  //     this.setState({ liked: true });
  //     this.setState({ likeButton: "Unlike" });
  //     fetch("http://localhost:4000/addlike", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         uploader_id: this.props.oneRecipe[0].uploader_id,
  //         recipe_id: this.props.oneRecipe[0].id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("data add like fetch:", data);
  //       })
  //       .catch((e) => {
  //         console.log("error", e);
  //       });
  //   }
  // };
  // handleFavs = (e) => {
  //   // console.log("this.props.oneRecipe[0].id", this.props.oneRecipe[0].id);
  //   if (this.state.addToFavs) {
  //     this.setState({ addToFavs: false });
  //     this.setState({ favsButton: "Add To Favorites" });
  //     fetch("http://localhost:4000/removefromfavorite", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         uploader_id: this.props.oneRecipe[0].uploader_id,
  //         recipe_id: this.props.oneRecipe[0].id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("data remove from favorite fetch:", data);
  //       })
  //       .catch((e) => {
  //         console.log("error", e);
  //       });
  //   } else {
  //     this.setState({ addToFavs: true });
  //     this.setState({ favsButton: "Remove From Favorites" });
  //     fetch("http://localhost:4000/addtofavorite", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         uploader_id: this.props.oneRecipe[0].uploader_id,
  //         recipe_id: this.props.oneRecipe[0].id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("data add to favorite fetch:", data);
  //       })
  //       .catch((e) => {
  //         console.log("error", e);
  //       });
  //   }
  // };

  goBackHome = () => {
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

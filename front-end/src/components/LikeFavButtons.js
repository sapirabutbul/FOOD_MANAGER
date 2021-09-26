import React from "react";
import { connect } from "react-redux";

class LikeFavButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likeButton: "Like",
      addToFavs: false,
      favsButton: "Add To Favorites",
    };
  }
  handleLike = (e) => {
    if (this.state.liked) {
      this.setState({ liked: false });
      this.setState({ likeButton: "Like" });
      fetch("http://localhost:4000/removelike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data remove like fetch:", data);
        })
        .catch((e) => {
          console.log("error", e);
        });
    } else {
      this.setState({ liked: true });
      this.setState({ likeButton: "Unlike" });
      fetch("http://localhost:4000/addlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data add like fetch:", data);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };
  handleFavs = (e) => {
    console.log("user iddddddddddd", this.props.id);
    // console.log("this.props.oneRecipe[0].id", this.props.oneRecipe[0].id);
    if (this.state.addToFavs) {
      this.setState({ addToFavs: false });
      this.setState({ favsButton: "Add To Favorites" });
      fetch("http://localhost:4000/removefromfavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data remove from favorite fetch:", data);
        })
        .catch((e) => {
          console.log("error", e);
        });
    } else {
      this.setState({ addToFavs: true });
      this.setState({ favsButton: "Remove From Favorites" });
      fetch("http://localhost:4000/addtofavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data add to favorite fetch:", data);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };
  render() {
    // const { eachRecipe } = props;
    // // console.log("eachRecipe", eachRecipe);
    // const { id, title, uploader_name } = eachRecipe;
    const { likeButton, favsButton } = this.state;
    return (
      <>
        <div style={{ border: "2px solid red" }}>
          <button onClick={this.handleLike}>{likeButton}</button>
          <button onClick={this.handleFavs}>{favsButton}</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    oneRecipe: state.recipesReducer.oneRecipe,
    id: state.userReducer.user_id,
    token: state.userReducer.token,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToFavorites: (e) => dispatch(addToFavorites(e)),
//   };
// };
export default connect(mapStateToProps, null)(LikeFavButtons);

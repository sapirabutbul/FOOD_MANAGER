import React from "react";
import { connect } from "react-redux";

class LikeFavButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeButton: "Like",
      favsButton: "Add To Favorites",
      uploaderPoints: null,
    };
  }

  componentDidMount() {
    console.log("componentDidMount like fav button");
    this.checkingFavs();
    this.checkingLikes();
    const { oneRecipe, allUsers_points } = this.props;
    allUsers_points.map((element) => {
      if (element.user_id === oneRecipe[0].uploader_id) {
        this.setState({ uploaderPoints: element.points });
      }
    });
  }

  checkingFavs = () => {
    console.log(
      "this.props.oneRecipe[0].id",
      this.props.oneRecipe[0].id,
      "ggg",
      this.props.id
    );
    fetch("http://localhost:4000/checkfavbutton", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.props.id,
        recipe_id: this.props.oneRecipe[0].id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          console.log("dataa removeeee", data);
          this.setState({ favsButton: "Remove From Favorites" });
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  checkingLikes = () => {
    fetch("http://localhost:4000/checklikebutton", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.props.id,
        recipe_id: this.props.oneRecipe[0].id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          console.log("dataa removeeee likes", data);
          this.setState({ likeButton: "Unlike" });
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  handleLike = (e) => {
    console.log("ccccccccccccccccccccccccccccheckkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    if (this.state.likeButton === "Unlike") {
      fetch("http://localhost:4000/removelike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
          uploaderPoints: this.state.uploaderPoints,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data remove like fetch:", data);
          this.setState({ likeButton: "Like" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    } else if (this.state.likeButton === "Like") {
      fetch("http://localhost:4000/addlike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
          uploaderPoints: this.state.uploaderPoints,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data add like fetch:", data);
          this.setState({ likeButton: "Unlike" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };

  handleFavs = (e) => {
    console.log("user iddddddddddd", this.props.id);
    // console.log("this.props.oneRecipe[0].id", this.props.oneRecipe[0].id);
    if (this.state.favsButton === "Remove From Favorites") {
      // this.setState({ addToFavs: false });
      fetch("http://localhost:4000/removefromfavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
          uploaderPoints: this.state.uploaderPoints,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data remove from favorite fetch:", data);
          this.setState({ favsButton: "Add To Favorites" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    } else if (this.state.favsButton === "Add To Favorites") {
      fetch("http://localhost:4000/addtofavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.id,
          recipe_id: this.props.oneRecipe[0].id,
          uploader_id: this.props.oneRecipe[0].uploader_id,
          uploaderPoints: this.state.uploaderPoints,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data add to favorite fetch:", data);
          this.setState({ favsButton: "Remove From Favorites" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };
  render() {
    // const { eachRecipe } = props;
    console.log("ggggggggggggggggggggggg", this.state.uploaderPoints);
    // const { id, title, uploader_name } = eachRecip
    const { likeButton, favsButton } = this.state;
    return (
      <>
        <div>
          <button
            className="likeFavButton"
            id="likeButton"
            onClick={this.handleLike}
          >
            {likeButton}
          </button>
          <button
            className="likeFavButton"
            id="favoriteButton"
            onClick={this.handleFavs}
          >
            {favsButton}
          </button>
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
    allUsers_points: state.userReducer.allUsers_points,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToFavorites: (e) => dispatch(addToFavorites(e)),
//   };
// };
export default connect(mapStateToProps, null)(LikeFavButtons);

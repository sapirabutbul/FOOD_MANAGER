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
    fetch("https://food-manager-react.herokuapp.com/checkfavbutton", {
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
          this.setState({ favsButton: "Remove From Favorites" });
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  checkingLikes = () => {
    fetch("https://food-manager-react.herokuapp.com/checklikebutton", {
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
          this.setState({ likeButton: "Unlike" });
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  handleLike = (e) => {
    if (this.state.likeButton === "Unlike") {
      fetch("https://food-manager-react.herokuapp.com/removelike", {
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
          this.setState({ likeButton: "Like" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    } else if (this.state.likeButton === "Like") {
      fetch("https://food-manager-react.herokuapp.com/addlike", {
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
          this.setState({ likeButton: "Unlike" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };

  handleFavs = (e) => {
    if (this.state.favsButton === "Remove From Favorites") {
      fetch("https://food-manager-react.herokuapp.com/removefromfavorite", {
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
          this.setState({ favsButton: "Add To Favorites" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    } else if (this.state.favsButton === "Add To Favorites") {
      fetch("https://food-manager-react.herokuapp.com/addtofavorite", {
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
          this.setState({ favsButton: "Remove From Favorites" });
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };
  render() {
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

export default connect(mapStateToProps, null)(LikeFavButtons);

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
  // componentDidMount() {
  //   this.props.fetchPoints();
  // }
  goBackHome = () => {
    console.log("props", this.props);
    this.props.history.goBack();
  };
  render() {
    const { oneRecipe, token } = this.props;
    if (!oneRecipe.length) {
      return <p>Loading...</p>;
    } else {
      // console.log("this props of recipe page", this.props);
      // console.log("this props of recipe page one", this.props.oneRecipe);
      const { title, ingredients, description, uploader_name, upload_date } =
        oneRecipe[0];
      let date = new Date(upload_date);
      let uploadDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      // console.log(Date(upload_date), "upload_date in dataaaaaaaaaaa");
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
                      {element.amount} {element.unit} {element.item}
                    </li>
                  );
                })}
              </ul>

              <p>description:</p>
              <p>{description}</p>
              <h3>upload by: {uploader_name}</h3>
              <h3>upload date: {uploadDate}</h3>
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
//     fetchPoints: () => dispatch(fetchPoints()),
//   };
// };
export default connect(mapStateToProps, null)(withRouter(RecipesPage));

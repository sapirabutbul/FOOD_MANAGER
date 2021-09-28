import React from "react";
import { connect } from "react-redux";
import RecipesBook from "./RecipesBook";
import ErrorBoundary from "./ErrorBoundary";
import { fetchPoints } from "../redux/actions";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.token) {
      console.log("if token feth pints");
      this.props.fetchPoints();
    }
  }
  render() {
    return (
      <div>
        <div>
          <h1>Welcome To Food Manager!</h1>
          <h2>Sharing is caring, especially when it comes to food!</h2>
        </div>
        <ErrorBoundary>
          <RecipesBook />
        </ErrorBoundary>
      </div>
    );
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPoints: () => dispatch(fetchPoints()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

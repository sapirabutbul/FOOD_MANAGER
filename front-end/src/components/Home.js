import React from "react";
import { connect } from "react-redux";
import RecipesBook from "./RecipesBook";
import ErrorBoundary from "./ErrorBoundary";
import { fetchPoints } from "../redux/actions";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.fetchPoints();
    }
  }
  render() {
    return (
      <>
        <a name="top"></a>
        <div>
          <header className="tc mt0">
            <h1>Welcome To Food Manager!</h1>
            <h2>Sharing is caring</h2>
            <h2 className="f2">Especially when it comes to food!</h2>
          </header>
          <ErrorBoundary>
            <RecipesBook />
          </ErrorBoundary>
        </div>
      </>
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

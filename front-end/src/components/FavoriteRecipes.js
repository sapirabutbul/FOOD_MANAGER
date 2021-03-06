import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { goToRecipe, fetchFavoritesRecipes } from "../redux/actions";

class FavoriteRecipes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchFavoritesRecipes(this.props.id);
  }
  render() {
    const { favoritesRecipes_id, recipes } = this.props;
    return (
      <div className="recipesBox">
        <h2 className="smallHeader">FavoriteRecipes</h2>
        <div>
          {recipes.map((element, i) => {
            return favoritesRecipes_id.map((item) => {
              if (item === element.id) {
                return (
                  <>
                    <div className="grow">
                      <Link
                        className="recipesLinks"
                        id={element.id}
                        to="/recipepage"
                        onClick={goToRecipe}
                      >
                        <img
                          className="recipesIcon"
                          src="https://www.creativefabrica.com/wp-content/uploads/2018/09/Crossed-spoon-and-fork-logo-by-yahyaanasatokillah.jpg"
                        />
                        {element.title}
                      </Link>
                    </div>
                  </>
                );
              }
            });
          })}
        </div>
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
    favoritesRecipes_id: state.recipesReducer.favoritesRecipes_id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    goToRecipe: (e) => dispatch(goToRecipe(e)),
    fetchFavoritesRecipes: (e) => dispatch(fetchFavoritesRecipes(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);

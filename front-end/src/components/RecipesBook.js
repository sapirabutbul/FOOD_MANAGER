import React from "react";
import { connect } from "react-redux";
import { filteringRecipe, sortingRecipes } from "../redux/actions";
import RecipeCard from "./RecipeCard";

class RecipesBook extends React.Component {
  constructor() {
    super();
    this.state = {
      searchFiled: "",
      filteredRecipes: [],
    };
  }

  SubmitSearch = (e) => {
    e.preventDefault();
    this.props.filteringRecipe(e.target[0].value);
    e.target.reset();
  };

  handleSort = (e) => {
    this.props.sortingRecipes(e.target.value);
  };

  render() {
    return (
      <div className="tc mt6">
        <h1 className="headers">Our Recipes</h1>
        <div>
          <form onSubmit={this.SubmitSearch}>
            <input type="text" className="w-25 br3 h2 ma3" />
            <button
              type="submit"
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-gold"
            >
              Search Recipes
            </button>
            <select
              name="sort"
              id="sort"
              onChange={this.handleSort}
              className="f6 link dim br3 ph3 pv2 mb2 dib black bg-white ma2"
            >
              <option defaultValue hidden>
                Sort By
              </option>
              <option value="byname">By Name</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </form>
        </div>
        <div className="flex flex-wrap">
          {(this.props.filterRecipes
            ? this.props.filterRecipes
            : this.props.recipes
          ).map((item, i) => {
            return <RecipeCard key={i} eachRecipe={item} index={i} />;
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name,
    email: state.userReducer.email,
    id: state.userReducer.user_id,
    recipes: state.recipesReducer.recipes,
    oneRecipe: state.recipesReducer.oneRecipe,
    filterRecipes: state.recipesReducer.filterRecipes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filteringRecipe: (e) => dispatch(filteringRecipe(e)),
    sortingRecipes: (e) => dispatch(sortingRecipes(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecipesBook);

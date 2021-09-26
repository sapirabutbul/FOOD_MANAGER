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
    console.log("e.target[0].value", e, e.target[0].value);
    this.props.filteringRecipe(e.target[0].value);
    e.target.reset();
  };

  handleSort = (e) => {
    const { recipes } = this.props;
    console.log("sorting", e.target.value);
    this.props.sortingRecipes(e.target.value);
  };

  render() {
    console.log("recipessssss", this.props.recipes);

    return (
      <div>
        <h2>RecipesBook</h2>
        <div>
          <form onSubmit={this.SubmitSearch}>
            <input type="text" />
            <button type="submit">Search Recipes</button>
            <select name="sort" id="sort" onChange={this.handleSort}>
              <option defaultValue hidden>
                Sort By
              </option>
              <option value="byname">By Name</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </form>
        </div>
        <div>
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

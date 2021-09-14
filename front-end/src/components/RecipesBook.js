import React from "react";
import { connect } from "react-redux";
import {
  fetchAllRecipes,
  filteringRecipe,
  sortingRecipes,
} from "../redux/actions";
import RecipeCard from "./RecipeCard";
class RecipesBook extends React.Component {
  constructor() {
    super();
    this.state = {
      searchFiled: "",
      filteredRecipes: [],
    };
  }
  componentDidMount() {
    console.log("componentDidMount recipes book");

    // this.setState({ filterRecipes: all });
    this.props.fetchAllRecipes();
  }

  SubmitSearch = (e) => {
    e.preventDefault();
    console.log("e.target[0].value", e, e.target[0].value);
    this.props.filteringRecipe(e.target[0].value);
    e.target.reset();

    // const { recipes } = this.props;
    // const filterRecipes = recipes.filter((item) => {
    //   return item.title.toLowerCase().includes(e.target[0].value.toLowerCase());
    // });
    // this.setState({ filteredRecipes: filterRecipes });
  };

  handleSort = (e) => {
    const { recipes } = this.props;
    console.log("sorting", e.target.value);

    this.props.sortingRecipes(e.target.value);
    // switch (e.target.value) {
    //   case "byname":
    //     recipes.sort((first, second) => {
    //       console.log("first", first, second);
    //       console.log("sortArray inside sort", recipes);
    //       return first.title - second.title;
    //     });

    //     console.log("sortArray", recipes);
    //     break;
    //   case "newest":
    //     recipes.sort(
    //       (first, second) =>
    //         parseInt(second.upload_date) - parseInt(first.upload_date)
    //     );
    //     break;
    //   case "oldest":
    //     recipes.sort(
    //       (first, second) =>
    //         parseInt(first.upload_date) - parseInt(second.upload_date)
    //     );
    //     break;
    //   default:
    //     break;
    // }
  };

  render() {
    // const { searchFiled } = this.state;
    // const { recipes } = this.props;
    // const filterRecipes = recipes.filter((item) => {
    //   return item.title.toLowerCase().includes(searchFiled.toLowerCase());
    // });
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
    fetchAllRecipes: (e) => dispatch(fetchAllRecipes(e)),
    filteringRecipe: (e) => dispatch(filteringRecipe(e)),
    sortingRecipes: (e) => dispatch(sortingRecipes(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RecipesBook);

import React from "react";
import { connect } from "react-redux";
import { fetchFavoritesRecipes, makeShoppingList } from "../redux/actions";
import UserShopList from "./UserShopList";

class ShoppingList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchFavoritesRecipes(this.props.id);
  }
  submitList = (e) => {
    e.preventDefault();
    let recipes_id = [];
    for (let i = 0; i < e.target.length - 1; i++) {
      const element = e.target[i];
      // console.log("check", element.checked);
      if (element.checked) {
        // console.log("value", element.value);
        // console.log("value", element.id);
        recipes_id.push(element.id);
      }
      // console.log("recipes_id      :", recipes_id);
      this.props.makeShoppingList(recipes_id);
    }
    // e.target.forEach((element) => {
    //   console.log("elementtttttt", element);
    // });
  };
  render() {
    const { favoritesRecipes_id, recipes, id, shoppingList_id } = this.props;
    return (
      <div>
        <h2>ShoppingList</h2>
        <form onSubmit={this.submitList}>
          {recipes.map((element, i) => {
            // console.log("element recipes  :", element);
            return favoritesRecipes_id.map((item) => {
              //   let favrecipes = item.favorite_recipe_id;
              if (item === element.id) {
                return (
                  <>
                    <div key={element.id}>
                      <input
                        type="checkbox"
                        id={element.id}
                        name={element.title}
                        value={element.title}
                      />
                      <label for={element.title}>{element.title}</label>
                    </div>
                  </>
                );
              }
            });
          })}
          {recipes.map((element) => {
            if (element.uploader_id === id) {
              // console.log("element   :", element);
              return (
                <>
                  <div key={element.id}>
                    <input
                      type="checkbox"
                      id={element.id}
                      name={element.title}
                      value={element.title}
                    />
                    <label for={element.title}>{element.title}</label>
                  </div>
                </>
              );
            }
          })}
          <button>Make me a Shopping List</button>
        </form>
        <div>{shoppingList_id ? <UserShopList /> : null}</div>
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
    favoritesRecipes_id: state.recipesReducer.favoritesRecipes_id,
    shoppingList_id: state.recipesReducer.shoppingList_id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavoritesRecipes: (e) => dispatch(fetchFavoritesRecipes(e)),
    makeShoppingList: (e) => dispatch(makeShoppingList(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);

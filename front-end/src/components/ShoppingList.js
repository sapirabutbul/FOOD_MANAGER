import React from "react";
import { connect } from "react-redux";
import {
  fetchFavoritesRecipes,
  makeShoppingList,
  handleReset,
} from "../redux/actions";
import UserShopList from "./UserShopList";

class ShoppingList extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     userListOn: false,
  //   };
  // }
  componentDidMount() {
    this.props.fetchFavoritesRecipes(this.props.id);
  }
  // checkReset = (e) => {
  //   e.preventDefault();
  //   if (!this.state.userListOn) {
  //     this.setState({ userListOn: true });
  //     this.props.handleReset();
  //     this.submitList(e);
  //   } else {
  //     this.submitList(e);
  //   }
  // };
  submitList = (e) => {
    e.preventDefault();
    console.log("eeeeeeeeeeeeeee", e);
    // let recipes_id = [];
    // for (let i = 0; i < e.target.length - 1; i++) {
    //   const element = e.target[i];
    //   if (element.checked) {
    //     recipes_id.push(element.id);
    //   }
    //   console.log("recipes_id      :", recipes_id);
    this.props.makeShoppingList(e);
    // }
  };
  // submitList = (e) => {
  //   e.preventDefault();
  //   console.log("eeeeeeeeeeeeeee", e);
  //   let recipes_id = [];
  //   for (let i = 0; i < e.target.length - 1; i++) {
  //     const element = e.target[i];
  //     if (element.checked) {
  //       recipes_id.push(element.id);
  //     }
  //     console.log("recipes_id      :", recipes_id);
  //     this.props.makeShoppingList(recipes_id);
  //   }
  // };
  render() {
    console.log("shoppingList_id", this.props.shoppingList_id);
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
    handleReset: (e) => dispatch(handleReset(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);

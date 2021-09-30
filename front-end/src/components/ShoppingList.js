import React from "react";
import { connect } from "react-redux";
import {
  fetchFavoritesRecipes,
  makeShoppingList,
  handleReset,
} from "../redux/actions";
import UserShopList from "./UserShopList";
import { withRouter } from "react-router-dom";

class ShoppingList extends React.Component {
  componentDidMount() {
    this.props.fetchFavoritesRecipes(this.props.id);
  }

  submitList = (e) => {
    e.preventDefault();
    this.props.makeShoppingList(e);
    this.props.history.push(`usershoplist`);
  };

  render() {
    const { favoritesRecipes_id, recipes, id } = this.props;
    return (
      <div className="recipesBox">
        <h2 className="smallHeader">ShoppingList</h2>
        <form onSubmit={this.submitList}>
          {recipes.map((element, i) => {
            return favoritesRecipes_id.map((item) => {
              if (item === element.id) {
                return (
                  <>
                    <div className="shoppingListbox" key={element.id}>
                      <input
                        className="checkBox"
                        type="checkbox"
                        id={element.id}
                        name={element.title}
                        value={element.title}
                      />
                      <label className="shoppingListItems" for={element.title}>
                        {element.title}
                      </label>
                    </div>
                  </>
                );
              }
            });
          })}
          {recipes.map((element) => {
            if (element.uploader_id === id) {
              return (
                <>
                  <div className="shoppingListbox" key={element.id}>
                    <input
                      className="checkBox"
                      type="checkbox"
                      id={element.id}
                      name={element.title}
                      value={element.title}
                    />
                    <label className="shoppingListItems" for={element.title}>
                      {element.title}
                    </label>
                  </div>
                </>
              );
            }
          })}
          <button className="submitButton shopButton">
            Make me a Shopping List
          </button>
        </form>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShoppingList));

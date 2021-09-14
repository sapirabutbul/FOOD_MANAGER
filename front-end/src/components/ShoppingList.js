import React from "react";
import { connect } from "react-redux";

class ShoppingList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <h2>ShoppingList</h2>
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
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchAllRecipes: (e) => dispatch(fetchAllRecipes(e)),
//   };
// };
export default connect(mapStateToProps, null)(ShoppingList);

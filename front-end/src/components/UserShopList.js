import React from "react";
import { connect } from "react-redux";

class UserShopList extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    const { recipes, shoppingList_id } = this.props;
    let allIngredientsList = [];
    recipes.map((element, i) => {
      return shoppingList_id.map((item) => {
        if (parseInt(item) === parseInt(element.id)) {
          const { ingredients } = element;
          console.log("ingredients", JSON.parse(ingredients));
          JSON.parse(ingredients).forEach((element) => {
            console.log("element hhgdhdh", element);
            allIngredientsList.push(element);
          });
        }
      });
    });
    console.log("allIngredientsList", allIngredientsList);
    this.setState({ ingredients: allIngredientsList });
  }
  render() {
    console.log("this.state.ingredients", this.state.ingredients);
    const { recipes, shoppingList_id } = this.props;
    return (
      <div style={{ border: "1px solid green" }}>
        {/* {console.log("this.props.shoppingList_id", shoppingList_id)} */}
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
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchFavoritesRecipes: (e) => dispatch(fetchFavoritesRecipes(e)),
//   };
// };
export default connect(mapStateToProps, null)(UserShopList);

{
  /* <ul>
          {recipes.map((element, i) => {
            console.log("element recipes map  :", element);
            return shoppingList_id.map((item) => {
              console.log("itemm", item);
              //   let favrecipes = item.favorite_recipe_id;
              console.log("element shopping list map  :", element);
              if (parseInt(item) === parseInt(element.id)) {
                {
                  console.log(
                    "element shopping list map inside if  gdhggggggggggggggggggggggggggggggggggggggggggggggggggggggshdjdjd :",
                    element
                  );
                }
                return (
                  <>
                    <li>{element.title}</li>
                   
                  </>
                );
              }
            });
          })}
        </ul> */
}

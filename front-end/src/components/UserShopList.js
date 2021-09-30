import React, { forwardRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetShoppingList } from "../redux/actions";
class UserShopList extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    this.handleShoppingList();
  }
  handleShoppingList = () => {
    const { recipes, shoppingList_id } = this.props;
    let allIngredientsList = [];
    if (!shoppingList_id) {
      return null;
    } else {
      recipes.map((element, i) => {
        return shoppingList_id.map((item) => {
          if (parseInt(item) === parseInt(element.id)) {
            const { ingredients } = element;
            JSON.parse(ingredients).forEach((element) => {
              allIngredientsList.push(element);
            });
          }
        });
      });
      let finalIngredientsList = [];
      let doubleValues = [];
      let newAmount;
      let length = allIngredientsList.length;
      for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < allIngredientsList.length; j++) {
          if (allIngredientsList[i].item === allIngredientsList[j].item) {
            doubleValues.push(allIngredientsList[i].item);
            if (allIngredientsList[i].unit === allIngredientsList[j].unit) {
              newAmount =
                parseInt(allIngredientsList[i].amount) +
                parseInt(allIngredientsList[j].amount);
              finalIngredientsList.push({
                amount: newAmount,
                unit: allIngredientsList[i].unit,
                item: allIngredientsList[i].item,
              });
              allIngredientsList.splice(j, 1);
            } else {
              finalIngredientsList.push({
                amount:
                  allIngredientsList[i].amount +
                  " " +
                  allIngredientsList[i].unit +
                  " & ",
                unit:
                  allIngredientsList[j].amount +
                  " " +
                  allIngredientsList[j].unit,
                item: allIngredientsList[i].item,
              });
              allIngredientsList.splice(j, 1);
            }
          }
        }
      }

      for (let k = 0; k < finalIngredientsList.length; k++) {
        const item = finalIngredientsList[k];
        allIngredientsList.map((element, index) => {
          if (element.item !== item.item) {
            console.log("element not equal", index, element);
          } else {
            allIngredientsList.splice(index, 1);
            console.log("element equal", index, element);
          }
        });
      }
      this.setState({
        ingredients: [...finalIngredientsList, ...allIngredientsList],
      });
    }
  };
  render() {
    const { ingredients } = this.state;
    const { shoppingList_name } = this.props;

    return (
      <div className="userShopList" style={{ border: "1px solid green" }}>
        <h2 className="shopHeader">Shopping List:</h2>
        <ul>
          {ingredients.map((element) => {
            return (
              <>
                <li>
                  {element.amount} {element.unit} {element.item}
                </li>
              </>
            );
          })}
        </ul>
        <h2 className="shopHeader">made from those recipes:</h2>
        <ul>
          {shoppingList_name.map((element) => {
            return (
              <>
                <li>{element}</li>
              </>
            );
          })}
        </ul>
        <Link className="submitButton" to={`shoppinglist`}>
          Go Back
        </Link>
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
    shoppingList_name: state.recipesReducer.shoppingList_name,
  };
};

export default connect(mapStateToProps, null)(UserShopList);

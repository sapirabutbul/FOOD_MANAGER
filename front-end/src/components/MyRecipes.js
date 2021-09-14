import React from "react";
import { connect } from "react-redux";
import { goToRecipe } from "../redux/actions";

class MyRecipes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { recipes, id, goToRecipe } = this.props;
    return (
      <div>
        <h2>MyRecipes</h2>
        <div>
          {recipes.map((element) => {
            if (element.uploader_id === id) {
              console.log("element   :", element);
              return (
                <>
                  <div id={element.id} onClick={goToRecipe}>
                    <h3>{element.title}</h3>
                  </div>
                </>
              );
            }
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    goToRecipe: (e) => dispatch(goToRecipe(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);

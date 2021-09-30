import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { goToRecipe } from "../redux/actions";

class MyRecipes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { recipes, id, goToRecipe } = this.props;
    return (
      <div className="recipesBox">
        <h2 className="smallHeader">MyRecipes</h2>
        <div>
          {recipes.map((element) => {
            if (element.uploader_id === id) {
              return (
                <>
                  <div className="grow">
                    <Link
                      className="recipesLinks"
                      id={element.id}
                      to="/recipepage"
                      onClick={goToRecipe}
                    >
                      <img
                        className="recipesIcon"
                        src="https://www.creativefabrica.com/wp-content/uploads/2018/09/Crossed-spoon-and-fork-logo-by-yahyaanasatokillah.jpg"
                      />
                      {element.title}
                    </Link>
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

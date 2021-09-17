import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { goToRecipe, fetchFavoritesRecipes } from "../redux/actions";

class FavoriteRecipes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchFavoritesRecipes(this.props.id);
  }
  render() {
    const { favoritesRecipes_id, recipes } = this.props;
    return (
      <div>
        {console.log("favoritesRecipes_id", favoritesRecipes_id)}
        <h2>FavoriteRecipes</h2>
        <div>
          {recipes.map((element, i) => {
            console.log("element recipes  :", element);
            return favoritesRecipes_id.map((item) => {
              //   let favrecipes = item.favorite_recipe_id;
              if (item === element.id) {
                return (
                  <>
                    <div>
                      <Link
                        id={element.id}
                        to="/recipepage"
                        onClick={goToRecipe}
                      >
                        {element.title}
                      </Link>
                    </div>
                  </>
                );
              }
            });
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
    oneRecipe: state.recipesReducer.oneRecipe,
    favoritesRecipes_id: state.recipesReducer.favoritesRecipes_id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    goToRecipe: (e) => dispatch(goToRecipe(e)),
    fetchFavoritesRecipes: (e) => dispatch(fetchFavoritesRecipes(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);
// {recipes.map((element, i) => {
//     console.log("element   :", element);
//     favoritesRecipes.map((item) => {
//       //   let favrecipes = item.favorite_recipe_id;
//       if (item.favorite_recipe_id === element.id) {
//         return (
//           <>
//             <div>
//               <Link
//                 id={element.id}
//                 to="/recipepage"
//                 onClick={goToRecipe}
//               >
//                 {element.title}
//               </Link>
//             </div>
//           </>
//         );
//       }
//     });
//     console.log("favoritesRecipes", favoritesRecipes);
//   })}

// {favoritesRecipes_id.map((item) => {
//     //   let favrecipes = item.favorite_recipe_id;
//     if (item.favorite_recipe_id === element.id) {
//       return (
//         <>
//           <div>
//             <Link id={element.id} to="/recipepage" onClick={goToRecipe}>
//               {element.title}
//             </Link>
//           </div>
//         </>
//       );
//     }
//   })}

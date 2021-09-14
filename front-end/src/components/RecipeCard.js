import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { goToRecipe } from "../redux/actions";

const RecipeCard = (props) => {
  const { eachRecipe } = props;
  // console.log("eachRecipe", eachRecipe);
  const { id, title, uploader_name } = eachRecipe;
  return (
    <>
      <div key={id} id={id} style={{ border: "2px solid blue" }}>
        <div>
          <h2>Recipe name: {title}</h2>
          <h3>upload by: {uploader_name}</h3>
          <Link to="/recipepage" onClick={props.goToRecipe} id={id}>
            Go To Recipe
          </Link>
        </div>
      </div>
    </>
  );
};
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
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);

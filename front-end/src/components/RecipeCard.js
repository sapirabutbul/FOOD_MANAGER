import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { goToRecipe } from "../redux/actions";

const RecipeCard = (props) => {
  const { eachRecipe } = props;
  const { id, title, uploader_name, upload_date } = eachRecipe;
  let date = new Date(upload_date);
  let uploadDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return (
    <>
      <div
        key={id}
        id={id}
        className="tc grow br3 pa2 ma3 dib bw2 shadow-5 w5 cardColor flex flex-column justify-between"
      >
        <div>
          <h2 className="">{title}</h2>
          <h3>upload by: {uploader_name}</h3>
          <h5>upload date: {uploadDate}</h5>
        </div>

        <Link
          className="cardlink f6 link dim br-pill ph3 pv2 mb2 ml5 mr5 dib white bg-red"
          to="/recipepage"
          onClick={props.goToRecipe}
          id={id}
        >
          Go To Recipe
        </Link>
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

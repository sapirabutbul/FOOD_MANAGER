import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UploadRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      ingredients: [],
      description: "",
      uploader_id: this.props.id,
      uploader_name: this.props.name,
      inputs: [],
      alertClass: "alertOff",
    };
  }
  //submit the ingredients
  addAllIngredient = (e) => {
    e.preventDefault();
    for (let i = 1; i < (this.state.inputs.length + 1) * 3; i++) {
      if (e.target[i].id === "ingredientAmount") {
        let amountitem = e.target[i].value;
        let amountunit = e.target[i + 1].value;
        let itemname = e.target[i + 2].value;
        let ingredientList = this.state.ingredients;
        ingredientList.push({
          amount: amountitem,
          unit: amountunit,
          item: itemname,
        });
        this.setState({ ingredients: ingredientList });
      }
    }
  };

  // handeling the state inputs array
  handleInputs = (e) => {
    e.preventDefault();
    let sum = 1;
    let inputsArray = this.state.inputs;
    inputsArray.push({ sum });
    this.setState({ inputs: inputsArray });
  };
  // handeling title
  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };
  onDescriptionChange = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  };

  onUploadRecipe = () => {
    if (!this.state.ingredients.length) {
      this.setState({ alertClass: "alertOn" });
      setTimeout(() => {
        this.setState({ alertClass: "alertOff" });
      }, 3000);
    } else {
      fetch("http://localhost:4000/uploadrecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.state.title,
          ingredients: JSON.stringify(this.state.ingredients),
          description: this.state.description,
          uploader_id: this.state.uploader_id,
          uploader_name: this.state.uploader_name,
          userPoints: this.props.userPoints,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("recipe data", data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.props.history.push(`/`);
    }
  };
  render() {
    const { inputs } = this.state;
    return (
      <>
        <div className="uploadBox">
          <h2 className="smallHeader">Upload a recipe</h2>
          <div className="uploadSmallBox">
            <label className="labels" htmlFor="title">
              Title:
            </label>
            <input
              className="inputs"
              type="text"
              name="title"
              id="title"
              onChange={this.onTitleChange}
            />
          </div>
          <div className="uploadSmallBox">
            <form onSubmit={this.addAllIngredient}>
              <label className="labels" htmlFor="ingredients">
                Ingredients:
              </label>
              <button onClick={this.handleInputs} className="submitButton">
                Add
              </button>
              <div key={0}>
                <input
                  className="inputs"
                  type="text"
                  name="ingredients"
                  placeholder="amount"
                  id="ingredientAmount"
                />
                <input
                  className="inputs"
                  type="text"
                  name="ingredients"
                  placeholder="unit"
                  id="ingredientUnit"
                />
                <input
                  className="inputs"
                  type="text"
                  name="ingredients"
                  placeholder="item"
                  id="ingredients"
                />
              </div>

              {inputs.map((element, i) => {
                return (
                  <div key={i + 1}>
                    <input
                      className="inputs"
                      type="text"
                      name="ingredients"
                      placeholder="amount"
                      id="ingredientAmount"
                    />
                    <input
                      className="inputs"
                      type="text"
                      name="ingredients"
                      placeholder="unit"
                      id="ingredientUnit"
                    />
                    <input
                      className="inputs"
                      type="text"
                      name="ingredients"
                      placeholder="item"
                      id="ingredients"
                    />
                  </div>
                );
              })}
              <div className="ma1">
                <button className="submitButton" type="submit">
                  Done
                </button>
              </div>
            </form>
          </div>
          <div className="uploadSmallBox">
            <label className="labels" htmlFor="description">
              Description:
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={this.onDescriptionChange}
              className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 ma2"
            />
          </div>
          <div className="uploadSmallBox">
            <button
              type="submit"
              className="submitButton uploadButton"
              onClick={this.onUploadRecipe}
            >
              Upload Recipe
            </button>
            <p className={this.state.alertClass}>
              you have to press done before uploading recipe!
            </p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name,
    email: state.userReducer.email,
    id: state.userReducer.user_id,
    userPoints: state.userReducer.userPoints,
  };
};

export default connect(mapStateToProps, null)(withRouter(UploadRecipe));

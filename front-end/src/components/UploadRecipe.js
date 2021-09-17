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
    };
  }
  //submit the ingredients
  addAllIngredient = (e) => {
    e.preventDefault();
    for (let i = 1; i < (this.state.inputs.length + 1) * 2; i++) {
      if (i % 2) {
        let amountitem = e.target[i].value;
        let itemname = e.target[i + 1].value;
        let ingredientList = this.state.ingredients;
        ingredientList.push({
          amount: amountitem,
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
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("this.props upload recipe", this.props);
    this.props.history.push(`/profile/myrecipes`);
  };
  render() {
    const { inputs } = this.state;
    return (
      <>
        <div>
          <h2>Upload a recipe</h2>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={this.onTitleChange}
            />
          </div>
          <div>
            <div>
              <form onSubmit={this.addAllIngredient}>
                <label htmlFor="ingredients">Ingredients</label>
                <button onClick={this.handleInputs}>Add</button>
                <div key={0}>
                  <input
                    type="text"
                    name="ingredients"
                    placeholder="amount"
                    id="ingredientAmount"
                  />
                  <input
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
                        type="text"
                        name="ingredients"
                        placeholder="amount"
                        id="ingredientAmount"
                      />
                      <input
                        type="text"
                        name="ingredients"
                        placeholder="item"
                        id="ingredients"
                      />
                    </div>
                  );
                })}
                <button type="submit">Done</button>
              </form>
            </div>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={this.onDescriptionChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="submitButton"
              onClick={this.onUploadRecipe}
            >
              Upload Recipe
            </button>
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
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     uploadUser: (e) => dispatch(uploadUser(e)),
//   };
// };
export default connect(mapStateToProps, null)(withRouter(UploadRecipe));

// import React from "react";

// class UploadRecipe extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       ingredients: [],
//       description: "",
//       uploader_id: null,
//       addInputOn: false,
//     };
//   }
//   addOneIngredient = (e) => {
//     e.preventDefault();
//     console.log(e);
//     console.log(e.target[0].value);
//     console.log(e.target[1].value);
//     let amountitem = e.target[0].value;
//     let itemname = e.target[1].value;
//     let ingredientList = this.state.ingredients;
//     ingredientList.push({
//       amount: amountitem,
//       item: itemname,
//     });
//     this.setState({ ingredients: ingredientList });
//     console.log("this.state.ingredients", this.state.ingredients);
//     this.setState({ addInputOn: true });
//     this.addInput();
//   };
//   addInput = () => {
//     return (
//       <>
//         <form onSubmit={this.addOneIngredient}>
//           <input
//             type="text"
//             name="ingredients"
//             id="ingredients"
//             onChange={this.onIngredientsChange}
//           />
//           <button>Add</button>
//         </form>
//       </>
//     );
//   };
//   handleAllIngredients = (e) => {
//     console.log(e);
//   };
//   submitRecipe = (e) => {
//     e.preventDefault();
//   };
//   render() {
//     // const inputs = () => {
//     //   for (let i = 0; i < 3; i++) {
//     //     return (
//     //       <form onSubmit={this.addOneIngredient}>
//     //         <input
//     //           type="text"
//     //           name="ingredients"
//     //           id="ingredients"
//     //           onChange={this.onIngredientsChange}
//     //         />
//     //         <button>Add</button>
//     //       </form>
//     //     );
//     //   }
//     // };
//     const { ingredients } = this.state;
//     return (
//       <>
//         <div>
//           <h2>Upload a recipe</h2>
//           {/* <form onSubmit={this.submitRecipe}> */}
//           <div>
//             <label htmlFor="title">Title</label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               onChange={this.onTitleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="ingredients">Ingredients</label>
//             <div>
//               <form onSubmit={this.addOneIngredient}>
//                 <input
//                   type="number"
//                   name="ingredients"
//                   placeholder="amount"
//                   id="ingredientAmount"
//                 />
//                 <input
//                   type="text"
//                   name="ingredients"
//                   placeholder="item"
//                   id="ingredients"
//                 />
//                 <button>Add</button>
//                 {ingredients.map((element) => {
//                   return (
//                     <>
//                       <input
//                         type="number"
//                         name="ingredients"
//                         placeholder="amount"
//                         id="ingredientAmount"
//                       />
//                       <input
//                         type="text"
//                         name="ingredients"
//                         placeholder="item"
//                         id="ingredients"
//                       />
//                     </>
//                   );
//                 })}
//               </form>
//             </div>
//             <button onClick={this.handleAllIngredients}>Done</button>
//           </div>
//           <div>
//             <label htmlFor="description">Description</label>
//             <input
//               type="text"
//               name="description"
//               id="description"
//               onChange={this.onDescriptionChange}
//             />
//           </div>
//           <div>
//             <button className="submitButton" onClick={this.onSubmitSignIn}>
//               Sign In
//             </button>
//           </div>
//           {/* </form> */}
//         </div>
//       </>
//     );
//   }
// }
// export default UploadRecipe;

// import React from "react";

// class UploadRecipe extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       ingredients: [],
//       description: "",
//       uploader_id: null,
//       addInputOn: false,
//     };
//   }
//   addOneIngredient = (e) => {
//     e.preventDefault();
//     console.log(e);
//     console.log(e.target[0].value);
//     this.setState({
//       ingredients: this.state.ingredients.push(e.target[0].value),
//     });
//     console.log("this.state.ingredients", this.state.ingredients);
//     this.setState({ addInputOn: true });
//     this.addInput();
//   };
//   addInput = () => {
//     return (
//       <>
//         <form onSubmit={this.addOneIngredient}>
//           <input
//             type="text"
//             name="ingredients"
//             id="ingredients"
//             onChange={this.onIngredientsChange}
//           />
//           <button>Add</button>
//         </form>
//       </>
//     );
//   };
//   handleAllIngredients = (e) => {
//     console.log(e);
//   };
//   submitRecipe = (e) => {
//     e.preventDefault();
//   };
//   render() {
//     return (
//       <>
//         <div>
//           <h2>Upload a recipe</h2>
//           {/* <form onSubmit={this.submitRecipe}> */}
//           <div>
//             <label htmlFor="title">Title</label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               onChange={this.onTitleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="ingredients">Ingredients</label>
//             <div>
//               <form onSubmit={this.addOneIngredient}>
//                 <input
//                   type="text"
//                   name="ingredients"
//                   id="ingredients"
//                   onChange={this.onIngredientsChange}
//                 />
//                 <button>Add</button>
//               </form>
//             </div>
//             {this.state.addInputOn ? this.addInput : null}
//             <button onClick={this.handleAllIngredients}>Done</button>
//           </div>
//           <div>
//             <label htmlFor="description">Description</label>
//             <input
//               type="text"
//               name="description"
//               id="description"
//               onChange={this.onDescriptionChange}
//             />
//           </div>
//           {}
//           <div>
//             <button className="submitButton" onClick={this.onSubmitSignIn}>
//               Sign In
//             </button>
//           </div>
//           {/* </form> */}
//         </div>
//       </>
//     );
//   }
// }
// export default UploadRecipe;

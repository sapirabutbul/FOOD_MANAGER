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
    console.log("eeeeeeeeeeeeeeeeee", e);
    console.log("eeeeeeeeeeeeeeeeee", e.target[3].id);

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
    console.log("target of desciritorgnjeobnebl", e.target.value);
    this.setState({ description: e.target.value });
  };

  onUploadRecipe = () => {
    if (!this.state.ingredients.length) {
      return null;
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
          console.log("data", data);
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("this.props upload recipe", this.props);
      this.props.history.push(`/`);
    }
  };
  render() {
    console.log("ingredients vdfgf", this.state.ingredients);
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
                    placeholder="unit"
                    id="ingredientUnit"
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
                        placeholder="unit"
                        id="ingredientUnit"
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
                <p>you have to press done before uploading recipe</p>
              </form>
            </div>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={this.onDescriptionChange}
              className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
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
    userPoints: state.userReducer.userPoints,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     uploadUser: (e) => dispatch(uploadUser(e)),
//   };
// };
export default connect(mapStateToProps, null)(withRouter(UploadRecipe));

// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

// class UploadRecipe extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       ingredients: [],
//       description: "",
//       uploader_id: this.props.id,
//       uploader_name: this.props.name,
//       inputs: [],
//     };
//   }
//   //submit the ingredients
//   addAllIngredient = (e) => {
//     e.preventDefault();
//     for (let i = 1; i < (this.state.inputs.length + 1) * 2; i++) {
//       if (i % 2) {
//         let amountitem = e.target[i].value;
//         let itemname = e.target[i + 1].value;
//         let ingredientList = this.state.ingredients;
//         ingredientList.push({
//           amount: amountitem,
//           item: itemname,
//         });
//         this.setState({ ingredients: ingredientList });
//       }
//     }
//   };

//   // handeling the state inputs array
//   handleInputs = (e) => {
//     e.preventDefault();
//     let sum = 1;
//     let inputsArray = this.state.inputs;
//     inputsArray.push({ sum });
//     this.setState({ inputs: inputsArray });
//   };
//   // handeling title
//   onTitleChange = (e) => {
//     this.setState({ title: e.target.value });
//   };
//   onDescriptionChange = (e) => {
//     e.preventDefault();
//     console.log("target of desciritorgnjeobnebl", e.target.value);
//     this.setState({ description: e.target.value });
//   };

//   onUploadRecipe = () => {
//     fetch("http://localhost:4000/uploadrecipe", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: this.state.title,
//         ingredients: JSON.stringify(this.state.ingredients),
//         description: this.state.description,
//         uploader_id: this.state.uploader_id,
//         uploader_name: this.state.uploader_name,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data", data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//     console.log("this.props upload recipe", this.props);
//     this.props.history.push(`/profile/myrecipes`);
//   };
//   render() {
//     const { inputs } = this.state;
//     return (
//       <>
//         <div>
//           <h2>Upload a recipe</h2>
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
//             <div>
//               <form onSubmit={this.addAllIngredient}>
//                 <label htmlFor="ingredients">Ingredients</label>
//                 <button onClick={this.handleInputs}>Add</button>
//                 <div key={0}>
//                   <input
//                     type="text"
//                     name="ingredients"
//                     placeholder="amount"
//                     id="ingredientAmount"
//                   />
//                   <input
//                     type="text"
//                     name="ingredients"
//                     placeholder="item"
//                     id="ingredients"
//                   />
//                 </div>

//                 {inputs.map((element, i) => {
//                   return (
//                     <div key={i + 1}>
//                       <input
//                         type="text"
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
//                     </div>
//                   );
//                 })}
//                 <button type="submit">Done</button>
//               </form>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="description">Description</label>
//             <textarea
//               type="text"
//               name="description"
//               id="description"
//               onChange={this.onDescriptionChange}
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="submitButton"
//               onClick={this.onUploadRecipe}
//             >
//               Upload Recipe
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     name: state.userReducer.name,
//     email: state.userReducer.email,
//     id: state.userReducer.user_id,
//   };
// };
// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     uploadUser: (e) => dispatch(uploadUser(e)),
// //   };
// // };
// export default connect(mapStateToProps, null)(withRouter(UploadRecipe));

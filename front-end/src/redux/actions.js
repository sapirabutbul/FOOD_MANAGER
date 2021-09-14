export const LOAD_USER = "LOAD_USER";
export const RECIPES = "RECIPES";
export const FETCH_RECIPE = "FETCH_RECIPE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const FILTER_RECIPES = "FILTER_RECIPES";
export const SORT_RECIPES = "SORT_RECIPES";

export const uploadUser = (value) => {
  return {
    type: LOAD_USER,
    payload: value,
  };
};

export const fetchAllRecipes = () => (dispatch) => {
  console.log("fetching");
  fetch("http://localhost:4000/showallrecipes")
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      dispatch({ type: RECIPES, payload: data });
    })
    .catch((e) => {
      console.log("error", e);
    });
};

export const filteringRecipe = (value) => {
  return {
    type: FILTER_RECIPES,
    payload: value,
  };
};
export const sortingRecipes = (value) => {
  return {
    type: SORT_RECIPES,
    payload: value,
  };
};
export const goToRecipe = (value) => (dispatch) => {
  // console.log("value id", value.target.id);
  fetch("http://localhost:4000/gotorecipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: value.target.id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data go to recipe action", data);
      dispatch({ type: FETCH_RECIPE, payload: data });
    })
    .catch((e) => {
      console.log("error", e);
    });
};

// export const addToFavorites = (value) => (dispatch) => {
//   console.log("value ", value);
//   fetch("http://localhost:4000/addtofavorite", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       uploader_id: value,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("data", data);
//       dispatch({ type: ADD_FAVORITE, payload: data });
//     })
//     .catch((e) => {
//       console.log("error", e);
//     });
// };
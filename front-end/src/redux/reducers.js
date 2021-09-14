import {
  LOAD_USER,
  RECIPES,
  FETCH_RECIPE,
  FILTER_RECIPES,
  SORT_RECIPES,
} from "./actions";
import { combineReducers } from "redux";

const userInitState = {
  user: {
    name: "",
    email: "",
    user_id: "",
    token: null,
  },
};

export const userReducer = (state = userInitState, action = {}) => {
  switch (action.type) {
    case LOAD_USER:
      // console.log("action.payload", action.payload);
      const { id, name, email } = action.payload.user;
      const { token } = action.payload;
      console.log("tokennnn action.payload.user", token);
      return { ...state, name: name, email: email, user_id: id, token: token };

    default:
      return { ...state };
  }
};

const recipesInitState = {
  recipes: [],
  oneRecipe: [],
  filterRecipes: null,
};
export const recipesReducer = (state = recipesInitState, action = {}) => {
  switch (action.type) {
    case RECIPES:
      return { ...state, recipes: action.payload };
    case FETCH_RECIPE:
      return { ...state, oneRecipe: action.payload };
    case FILTER_RECIPES:
      const filterRecipes = state.recipes.filter((item) => {
        return item.title.toLowerCase().includes(action.payload.toLowerCase());
      });
      return { ...state, filterRecipes: filterRecipes };
    case SORT_RECIPES:
      if (action.payload === "byname") {
        (state.filterRecipes ? state.filterRecipes : state.recipes).sort(
          function (first, second) {
            if (first.title < second.title) {
              return -1;
            }
            if (first.title > second.title) {
              return 1;
            }
            return 0;
          }
        );
        if (state.filterRecipes) {
          return {
            ...state,
            filterRecipes: [
              ...(state.filterRecipes ? state.filterRecipes : state.recipes),
            ],
          };
        } else {
          return {
            ...state,
            recipes: [
              ...(state.filterRecipes ? state.filterRecipes : state.recipes),
            ],
          };
        }
      } else if (action.payload === "newest") {
        (state.filterRecipes ? state.filterRecipes : state.recipes).sort(
          (first, second) =>
            new Date(second.upload_date) - new Date(first.upload_date)
        );
        if (state.filterRecipes) {
          return {
            ...state,
            filterRecipes: [
              ...(state.filterRecipes ? state.filterRecipes : state.recipes),
            ],
          };
        } else {
          return {
            ...state,
            recipes: [
              ...(state.filterRecipes ? state.filterRecipes : state.recipes),
            ],
          };
        }
      } else if (action.payload === "oldest") {
        (state.filterRecipes ? state.filterRecipes : state.recipes).sort(
          (first, second) =>
            new Date(first.upload_date) - new Date(second.upload_date)
        );
        if (state.filterRecipes) {
          return {
            ...state,
            filterRecipes: [
              ...(state.filterRecipes ? state.filterRecipes : state.recipes),
            ],
          };
        } else {
          return {
            ...state,
            recipes: [
              ...(state.filterRecipes ? state.filterRecipes : state.recipes),
            ],
          };
        }
      }

    default:
      return { ...state };
  }
};

export const reducer = combineReducers({
  userReducer,
  recipesReducer,
});

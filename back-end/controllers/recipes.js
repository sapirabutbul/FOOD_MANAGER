const db = require("../modules/db").db;

// upload recipe
const uploadRecipe = (req, res) => {
  console.log(req.body);
  const {
    title,
    ingredients,
    description,
    uploader_id,
    uploader_name,
    userPoints,
  } = req.body;
  db("recipes")
    .insert({
      title: title,
      ingredients: ingredients,
      description: description,
      uploader_id: uploader_id,
      uploader_name: uploader_name,
    })
    .then(
      db("user_points")
        .update({
          user_id: uploader_id,
          points: userPoints + 10,
        })
        .where({ user_id: uploader_id })
        .catch((e) => {
          console.log(e);
        })
    )
    .then((data) => {
      console.log(data);
      res.status(200).json("recipe uploaded");
    })
    .catch((e) => {
      console.log(e);
    });
};

//checking favorites and likes
const checkFavs = (req, res) => {
  return db("favorites")
    .select({
      user_id: req.body.user_id,
      favorite_recipe_id: req.body.recipe_id,
    })
    .where({ favorite_recipe_id: req.body.recipe_id });
};
const checkLikes = (req, res) => {
  return db("likes")
    .select({
      user_id: req.body.user_id,
      liked_recipe_id: req.body.recipe_id,
    })
    .where({ liked_recipe_id: req.body.recipe_id });
};
// add recipe to favorite
const addToFavorite = (req, res) => {
  console.log("req bodyyyyyyyy", req.body);
  const { user_id, recipe_id, uploader_id, uploaderPoints } = req.body;
  db("favorites")
    .insert({
      user_id: user_id,
      favorite_recipe_id: recipe_id,
    })
    .then(
      db("user_points")
        .update({
          user_id: uploader_id,
          points: uploaderPoints + 5,
        })
        .where({ user_id: uploader_id })
        .catch((e) => {
          console.log(e);
        })
    )
    .then((data) => {
      console.log("dataa addToFavorite", data);
      res.status(200).json("recipe added to favorites");
    })
    .catch((e) => {
      console.log("error in favs", e);
    });
};

// remove recipe from favorites
const removeFromFavorite = (req, res) => {
  console.log("req.body", req.body);
  const { user_id, recipe_id, uploader_id, uploaderPoints } = req.body;

  db("favorites")
    .where({
      user_id: user_id,
      favorite_recipe_id: recipe_id,
    })
    .del()
    // .then(
    //   db("user_points")
    //     .update({
    //       user_id: uploader_id,
    //       points: uploaderPoints - 5,
    //     })
    //     .where({ user_id: uploader_id })
    //     .catch((e) => {
    //       console.log(e);
    //     })
    // )
    .then((data) => {
      console.log("dataa removeFromFavorite", data);
      res.status(200).json("recipe remove from favorites");
    })
    .catch((e) => {
      console.log("error in favs", e);
    });
};
// add like to recipe
const addLike = (req, res) => {
  console.log("req.bodyyyyyyy", req.body);
  const { user_id, recipe_id, uploader_id, uploaderPoints } = req.body;

  db("likes")
    .insert({
      user_id: user_id,
      liked_recipe_id: recipe_id,
    })
    .then(
      db("user_points")
        .update({
          user_id: uploader_id,
          points: uploaderPoints + 5,
        })
        .where({ user_id: uploader_id })
        .catch((e) => {
          console.log(e);
        })
    )
    .then((data) => {
      console.log("dataaa addLike", data);
      res.status(200).json("recipe like added");
    })
    .catch((e) => {
      console.log("error in favs", e);
    });
};
// remove like from recipe
const removeLike = (req, res) => {
  console.log("req.body", req.body);
  const { user_id, recipe_id, uploader_id, uploaderPoints } = req.body;

  db("likes")
    .where({
      user_id: user_id,
      liked_recipe_id: recipe_id,
    })
    .del()
    // .then(
    //   db("user_points")
    //     .update({
    //       user_id: uploader_id,
    //       points: uploaderPoints - 5,
    //     })
    //     .where({ user_id: uploader_id })
    //     .catch((e) => {
    //       console.log(e);
    //     })
    // )
    .then((data) => {
      console.log("dataa removeLike", data);
      res.status(200).json("remove like from recipe");
    })
    .catch((e) => {
      console.log("error in favs", e);
    });
};

// fetch favorites recipes with user id
const favoritesRecipes = (req, res) => {
  return db
    .select("favorite_recipe_id")
    .from("favorites")
    .where({ user_id: req.body.user_id });
};

// fetch all recipes for recipes book
const showAllRecipes = () => {
  return db.select("*").from("recipes");
};

// fetch specefic recipe with id
const goToRecipe = (req, res) => {
  return db.select("*").from("recipes").where({ id: req.body.id });
};
// fetch users points
const fetchPoints = (req, res) => {
  return db.select("*").from("user_points");
};

module.exports = {
  uploadRecipe,
  addToFavorite,
  removeFromFavorite,
  showAllRecipes,
  goToRecipe,
  addLike,
  removeLike,
  favoritesRecipes,
  checkFavs,
  checkLikes,
  fetchPoints,
};

const db = require("../modules/db").db;

// upload recipe
const uploadRecipe = (req, res) => {
  console.log(req.body);
  const { title, ingredients, description, uploader_id, uploader_name } =
    req.body;
  console.log("title", title);
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
        .insert({
          user_id: uploader_id,
          points: 5,
        })
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

// add recipe to favorite
const addToFavorite = (req, res) => {
  console.log("req bodyyyyyyyy", req.body);
  db("favorites")
    .insert({
      user_id: req.body.user_id,
      favorite_recipe_id: req.body.recipe_id,
    })
    // .returning("*")
    .then(
      db("user_points")
        .insert({
          user_id: req.body.uploader_id,
          points: 4,
        })
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
  db("favorites")
    .where({
      user_id: req.body.uploader_id,
      favorite_recipe_id: req.body.recipe_id,
    })
    .del()
    // .returning("*")
    .then(
      db("user_points")
        .where({
          user_id: req.body.uploader_id,
          points: 4,
        })
        .del()
        .catch((e) => {
          console.log(e);
        })
    )
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
  console.log(req.body);
  db("likes")
    .insert({
      user_id: req.body.user_id,
      liked_recipe_id: req.body.recipe_id,
    })
    .then(
      db("user_points")
        .insert({
          user_id: req.body.uploader_id,
          points: 4,
        })
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
  db("likes")
    .where({
      user_id: req.body.user_id,
      liked_recipe_id: req.body.recipe_id,
    })
    .del()
    .then(
      db("user_points")
        .where({
          user_id: req.body.uploader_id,
          points: 4,
        })
        .del()
        .catch((e) => {
          console.log(e);
        })
    )
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
  console.log("req.bodyyyy", req.body);
  return db
    .select("favorite_recipe_id")
    .from("favorites")
    .where({ user_id: req.body.user_id });
};
// fetch all recipes for recipes book
const showAllRecipes = () => {
  console.log("hellooooooooooooo");
  // console.log("checking", db.select("*").from("recipes"));
  return db.select("*").from("recipes");
};

// fetch specefic recipe
const goToRecipe = (req, res) => {
  console.log("hellooooooooooooo", req.body.id);

  return db.select("*").from("recipes").where({ id: req.body.id });
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
};

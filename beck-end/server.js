const exp = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const withAuth = require("./controllers/withAuth");
const deleteuser = require("./controllers/deleteuser");
const recipes = require("./controllers/recipes");

const app = exp();
env.config();
app.use(cors());
app.use(bodyParser.json());
// handle account- (register, login, delete user, check token)
app.post("/register", (req, res) => {
  register.handleRegister(req, res);
});
app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res);
});
app.post("/checkToken", withAuth.withAuth, (req, res) => {
  res.sendStatus(200);
});
app.post("/delete", (req, res) => {
  deleteuser.handleDelete(req, res);
});

// handle recipes
app.post("/uploadrecipe", (req, res) => {
  recipes.uploadRecipe(req, res);
});
app.get("/showallrecipes", (req, res) => {
  console.log("checking show all recipes");
  recipes.showAllRecipes().then((data) => {
    res.send(data);
  });
});
app.post("/gotorecipe", (req, res) => {
  console.log("reqqqqqqq", req.body);
  recipes.goToRecipe(req, res).then((data) => {
    console.log("dataaaaaaaaaaaaa", data);
    res.send(data);
  });
});

app.post("/addtofavorite", (req, res) => {
  recipes.addToFavorite(req, res);
});
app.post("/removefromfavorite", (req, res) => {
  recipes.removeFromFavorite(req, res);
});

app.post("/addlike", (req, res) => {
  recipes.addLike(req, res);
});
app.post("/removelike", (req, res) => {
  recipes.removeLike(req, res);
});

app.listen(process.env.PORT, () => {
  console.log("listening to port " + process.env.PORT);
});

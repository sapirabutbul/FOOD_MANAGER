import React from "react";
import { Switch, Route } from "react-router";
import { connect } from "react-redux";

import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import DeleteUser from "./components/DeleteUser";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import withAuth from "./withAuth";
import { uploadUser } from "./redux/actions";
import FavoriteRecipes from "./components/FavoriteRecipes";
import MyRecipes from "./components/MyRecipes";
import RecipePage from "./components/RecipePage";

import UploadRecipe from "./components/UploadRecipe";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: "",
        name: "",
        email: "",
        joined: "",
      },
      token: null,
    };
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        joined: data.user.joined,
      },
      token: data.token,
    });

    this.props.uploadUser(data);
  };
  render() {
    const { user, token } = this.state;
    console.log("props checkinggggggggg :", this.props);
    return (
      <>
        <NavBar />
        <div>
          <Switch>
            <Route path="/" exact children={<Home />} />
            <Route path="/about" children={<About />} />
            <Route
              path="/register"
              render={(props) => (
                <Register {...props} loadUser={this.loadUser} />
              )}
            />
            <Route
              path="/signin"
              render={(props) => <SignIn {...props} loadUser={this.loadUser} />}
            />
            <Route
              path="/signout"
              render={(props) => (
                <SignOut {...props} loadUser={this.loadUser} />
              )}
            />
            <Route
              path="/delete"
              render={(props) => (
                <DeleteUser {...props} loadUser={this.loadUser} user={user} />
              )}
            />
            <Route path="/profile" component={withAuth(Profile, user, token)} />
            <Route path="/recipepage" render={() => <RecipePage />} />
            {/* <Route
                path="/uploadrecipe"
                children={<UploadRecipe user={user} token={token} />}
              /> */}
          </Switch>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name,
    email: state.userReducer.email,
    id: state.userReducer.user_id,
    token: state.userReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadUser: (e) => dispatch(uploadUser(e)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
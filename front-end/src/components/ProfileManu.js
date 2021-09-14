import React from "react";
import { Link } from "react-router-dom";
class ProfileManu extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Link className="link" to={`/myrecipes`} style={{ margin: "5px" }}>
          My Recipes
        </Link>
        <Link
          className="link"
          to={`/favoriterecipes`}
          style={{ margin: "5px" }}
        >
          Favorite Recipes
        </Link>
        <Link className="link" to={`/uploadrecipe`} style={{ margin: "5px" }}>
          Upload a Recipe
        </Link>
      </div>
    );
  }
}
export default ProfileManu;

// import React from 'react';

// class ProfileManu extends React.Component {
// constructor(){
//     super();
//     this.state = {

//     }
// }
// render(){
//     return(
//         <div>
//       <Link className="link" to="/userprofile" style={{ margin: "5px" }}>My Profile</Link>
//       <Link className="link" to="/myrecipes" style={{ margin: "5px" }}>My Recipes</Link>
//       <Link className="link" to="/register" style={{ margin: "5px" }}>Register</Link>
//       <Link className="link" to="/signin" style={{ margin: "5px" }}>Sign In</Link>
//       <Link className="link" to="/signout" style={{ margin: "5px" }}>Sign out</Link>
//       <Link className="link" to="/delete" style={{ margin: "5px" }}>Delete Account</Link>
//       <Link className="link" to="/profile" style={{ margin: "5px" }}>Profile</Link>
//         </div>
//     )
// }
// }
// export default ProfileManu;

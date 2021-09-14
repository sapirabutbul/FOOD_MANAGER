import React from "react";
import RecipesBook from "./RecipesBook";
import Tips from "./Tips";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>home</h1>
        <RecipesBook />
        <Tips />
      </div>
    );
  }
}
export default Home;

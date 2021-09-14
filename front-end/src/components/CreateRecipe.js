import React from "react";

class CreateRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      ingredient: [],
      description: "",
      uploader: "",
    };
  }
  render() {
    return (
      <div>
        <h2>CreateRecipe</h2>
      </div>
    );
  }
}
export default CreateRecipe;

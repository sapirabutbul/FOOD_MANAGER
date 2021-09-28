import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      console.log(this.state.errorInfo);
      return (
        <div>
          <h2>We Have a Problem Chef!</h2>
          <h4>Please try to refresh the page</h4>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;

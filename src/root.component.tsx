import React from "react";

export default class Root extends React.Component {
  state = {
    catastrophicError: false
  };
  render() {
    return this.state.catastrophicError
      ? this.errorHasOccurred()
      : this.loadNavigation();
  }
  componentDidCatch() {
    this.setState({ catastrophicError: true });
  }
  errorHasOccurred = () => {
    // TO-DO have a good UX for catastrophic errors
    return null;
  };
  loadNavigation = () => {
    return (
      <div>
        <h1>Navigation</h1>
      </div>
    );
  };
}

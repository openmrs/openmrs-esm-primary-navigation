import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import rootComponent from "./root.component";

const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent
});

export { bootstrap, mount, unmount };

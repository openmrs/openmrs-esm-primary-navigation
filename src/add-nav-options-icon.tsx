import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { navigateToUrl } from "single-spa";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AppNavButton
});

export function AppNavButton() {
  const url = "#";
  const button = (
    <a href={url} onClick={event => navigateToUrl(event, url)}>
      <AppSwitcher20 />
    </a>
  );
  return button;
}

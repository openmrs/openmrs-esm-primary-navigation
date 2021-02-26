import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { navigateToUrl } from "single-spa";
import { Add20 } from "@carbon/icons-react";
export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AddPatient
});

export function AddPatient() {
  const url = "https://openmrs-spa.org/openmrs/spa/patient-registration";
  const button = (
    <a href={url} onClick={event => navigateToUrl(event, url)}>
      <Add20 />
    </a>
  );
  return button;
}

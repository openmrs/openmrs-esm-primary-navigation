import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import {
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider
} from "carbon-components-react/es/components/UIShell";

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AppNavButton
});

export function AppNavButton() {
  const SourceFiles = {
    clinical: "http://localhost:8080/openmrs/spa/home",
    patients: "http://localhost:8080/openmrs/spa/patient-registration",
    reports: "http://localhost:8080/openmrs/reportingui/reportsapp/home.page",
    schedule: "http://localhost:8080/openmrs/appointmentschedulingui/home.page"
  };
  const options = (
    <HeaderPanel aria-label="Header Panel" expanded>
      <Switcher aria-label="Switcher Container">
        <SwitcherItem
          aria-label="Clinical Dashboard"
          href={SourceFiles.clinical}
        >
          Clinical Dashboard
        </SwitcherItem>
        <SwitcherDivider />
        <SwitcherItem href={SourceFiles.patients} aria-label="Patients">
          Patients
        </SwitcherItem>
        <SwitcherItem href={SourceFiles.schedule} aria-label="Schedule">
          Schedule
        </SwitcherItem>
        <SwitcherItem href={SourceFiles.reports} aria-label="Reports">
          Reports
        </SwitcherItem>
      </Switcher>
    </HeaderPanel>
  );
  return options;
}

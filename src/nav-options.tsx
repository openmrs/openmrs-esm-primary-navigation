import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import {
  HeaderPanel,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from 'carbon-components-react/es/components/UIShell';

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AppNavButton,
});

export function AppNavButton() {
  const SourceFiles = {
    clinical: '${openmrsSpaBase}/home',
    patients: '${openmrsSpaBase}/patient-registration',
    reports: '${openmrsSpaBase}/reportingui/reportsapp/home.page',
    schedule: '${openmrsSpaBase}/appointmentschedulingui/home.page',
  };
  const options = (
    <HeaderPanel aria-label='Header Panel' expanded>
      <Switcher aria-label='Switcher Container'>
        <SwitcherItem
          aria-label='Clinical Dashboard'
          href={SourceFiles.clinical}
        >
          Clinical Dashboard
        </SwitcherItem>
        <SwitcherDivider />
        <SwitcherItem href={SourceFiles.patients} aria-label='Patients'>
          Patients
        </SwitcherItem>
        <SwitcherItem href={SourceFiles.schedule} aria-label='Schedule'>
          Schedule
        </SwitcherItem>
        <SwitcherItem href={SourceFiles.reports} aria-label='Reports'>
          Reports
        </SwitcherItem>
      </Switcher>
    </HeaderPanel>
  );
  return options;
}

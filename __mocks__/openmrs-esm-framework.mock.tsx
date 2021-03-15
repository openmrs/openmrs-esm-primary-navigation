import React from "react";
import { of } from "rxjs";

export function openmrsFetch() {
  return new Promise(() => {});
}

export function getCurrentUser() {
  return of({ authenticated: false });
}

export function createErrorHandler() {
  return true;
}

export const ComponentContext = React.createContext(null);

export const openmrsComponentDecorator = jest
  .fn()
  .mockImplementation(() => component => component);

export const Extension = jest.fn().mockImplementation((props: any) => {
  return <slot />;
});

export const ExtensionSlot = ({ children }) => <>{children}</>;

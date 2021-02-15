import React from "react";

export const ComponentContext = React.createContext(null);

export const openmrsComponentDecorator = jest
  .fn()
  .mockImplementation(() => component => component);

export const ExtensionSlot = () => null;

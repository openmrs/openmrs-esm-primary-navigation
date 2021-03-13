import React from "react";
import { render } from "react-dom";
import "carbon-components/css/carbon-components.min.css";
import { Dropdown } from "carbon-components-react";

const items = [
  {
    id: "option-1",
    label: "Option 1"
  },
  {
    id: "option-2",
    label: "Option 2"
  },
  {
    id: "option-3",
    label: "Option 3"
  },
  {
    id: "option-4",
    label: "Option 4"
  }
];

interface DropdownMenuPanelProps {}

const DropdownMenuPanel: React.FC<DropdownMenuPanelProps> = () => {
  return (
    <Dropdown
      ariaLabel="Dropdown"
      id="carbon-dropdown-example"
      items={items}
      label="Dropdown menu options"
      titleText="Dropdown title"
    />
  );
};
export default DropdownMenuPanel;

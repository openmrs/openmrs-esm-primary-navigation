import React from "react";
import { ExtensionSlot } from "@openmrs/esm-framework";
import { HeaderPanel } from "carbon-components-react/es/components/UIShell";

interface AppMenuProps {
  expanded: boolean;
}

const AppMenu: React.FC<AppMenuProps> = ({ expanded }) => {
  return (
    <HeaderPanel
      aria-label="Toggle App Menu Panel"
      style={{
        height: "12rem",
        overFlow: "overflow"
      }}
      expanded={expanded}
    >
      <ExtensionSlot extensionSlotName="app-menu-slot" />
    </HeaderPanel>
  );
};

export default AppMenu;

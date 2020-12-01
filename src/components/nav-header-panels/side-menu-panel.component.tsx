import React, { useEffect, useState } from "react";
import { SideNav, SideNavProps } from "carbon-components-react";
import { ExtensionSlot } from "@openmrs/esm-react-utils";
import { getAppState } from "@openmrs/esm-api";

interface SideMenuPanelProps extends SideNavProps {}

const SideMenuPanel: React.FC<SideMenuPanelProps> = ({ expanded }) => {
  const [activePage, setActivePage] = useState();

  useEffect(() => {
    setActivePage(getAppState().getState().activePage);
    return getAppState().subscribe(v => {
      setActivePage(v.activePage);
    });
  }, []);

  return (
    expanded && (
      <SideNav expanded aria-label="Menu">
        {activePage && (
          <ExtensionSlot extensionSlotName={`nav-menu-${activePage}`} />
        )}
      </SideNav>
    )
  );
};

export default SideMenuPanel;

import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { HeaderPanel } from 'carbon-components-react/es/components/UIShell';

interface AppMenuProps {
  expanded: boolean;
}

const AppMenuPanel: React.FC<AppMenuProps> = ({ expanded }) => {
  return (
    <HeaderPanel aria-label="App Menu Panel" expanded={expanded}>
      <ExtensionSlot extensionSlotName="app-menu-slot" />
    </HeaderPanel>
  );
};

export default AppMenuPanel;

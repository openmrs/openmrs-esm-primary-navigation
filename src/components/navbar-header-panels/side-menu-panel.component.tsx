import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { SideNav } from 'carbon-components-react/es/components/UIShell';
import { SideNavProps } from 'carbon-components-react';
import styles from './side-menu-panel.component.scss';

interface SideMenuPanelProps extends SideNavProps {}

const SideMenuPanel: React.FC<SideMenuPanelProps> = ({ expanded }) => {
  return (
    expanded && (
      <SideNav expanded aria-label="Menu" isChildOfHeader={expanded} className={styles.link}>
        <ExtensionSlot extensionSlotName="nav-menu-slot" />
      </SideNav>
    )
  );
};

export default SideMenuPanel;

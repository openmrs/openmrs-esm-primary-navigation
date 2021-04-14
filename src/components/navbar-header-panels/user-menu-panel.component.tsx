import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { HeaderPanel } from 'carbon-components-react/es/components/UIShell';
import { HeaderPanelProps } from 'carbon-components-react';
import { LoggedInUser, UserSession } from '../../types';

interface UserMenuPanelProps extends HeaderPanelProps {
  user: LoggedInUser;
  allowedLocales: any;
  onLogout(): void;
  session: UserSession;
}

const UserMenuPanel: React.FC<UserMenuPanelProps> = ({ expanded, user, allowedLocales, onLogout, session }) => {
  return (
    <HeaderPanel expanded={expanded} aria-label="Location" aria-labelledby="Location Icon">
      <ExtensionSlot
        extensionSlotName="user-panel-slot"
        state={{
          user: user,
          allowedLocales: allowedLocales,
          onLogout: onLogout,
          referer: window.location.pathname,
          currentLocation: session?.sessionLocation?.display,
        }}
      />
    </HeaderPanel>
  );
};

export default UserMenuPanel;

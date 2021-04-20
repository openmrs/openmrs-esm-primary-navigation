import React from 'react';
import UserPanelSwitcher, { UserPanelSwitcherItemProps } from './user-panel-switcher.component';

const UserPanelSwitcherOffline: React.FC<UserPanelSwitcherItemProps> = props => (
  <UserPanelSwitcher {...props} isLogoutEnabled={false} />
);

export default UserPanelSwitcherOffline;

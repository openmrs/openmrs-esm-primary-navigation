import React from 'react';
import UserPanelSwitcher, { UserPanelSwitcherItemProps } from './user-panel-switcher.component';

const UserPanelSwitcherOnline: React.FC<UserPanelSwitcherItemProps> = props => (
  <UserPanelSwitcher {...props} isLogoutEnabled={true} />
);

export default UserPanelSwitcherOnline;

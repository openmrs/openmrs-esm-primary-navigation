import UserAvatarFilledAlt20 from '@carbon/icons-react/es/user--avatar--filled--alt/20';
import Switcher from 'carbon-components-react/lib/components/UIShell/Switcher';
import SwitcherDivider from 'carbon-components-react/lib/components/UIShell/SwitcherDivider';
import React from 'react';
import Logout from '../logout/logout.component';
import styles from './user-panel-switcher.component.scss';
import { LoggedInUser } from '../../types';
import { useIsOffline } from '../../offline/hooks';

interface UserPanelSwitcherItemProps {
  user: LoggedInUser;
  allowedLocales: any;
  onLogout(): void;
}

const UserPanelSwitcher: React.FC<UserPanelSwitcherItemProps> = ({ user, allowedLocales, onLogout }) => {
  const isOffline = useIsOffline();

  return (
    <div className={styles.switcherContainer}>
      <Switcher aria-label="Switcher Container">
        <UserAvatarFilledAlt20 />
        <p>{user.person.display}</p>
      </Switcher>
      {!isOffline && (
        <>
          <SwitcherDivider className={styles.divider} />
          <Switcher aria-label="Switcher Container">
            <Logout onLogout={onLogout} />
          </Switcher>
        </>
      )}
    </div>
  );
};

export default UserPanelSwitcher;

import React from "react";
import {
  HeaderPanel,
  HeaderPanelProps,
  Switcher
} from "carbon-components-react";
import { LoggedInUser } from "../../types";
import Logout from "../logout.component";
import UserMenu from "../usermenu.component";

interface UserMenuPanelProps extends HeaderPanelProps {
  user: LoggedInUser;
  allowedLocales: any;
  onLogout(): void;
}

const UserMenuPanel: React.FC<UserMenuPanelProps> = ({
  expanded,
  user,
  allowedLocales,
  onLogout
}) => {
  return (
    <HeaderPanel
      expanded={expanded}
      aria-label="Location"
      aria-labelledby="Location Icon"
    >
      <UserMenu
        user={user}
        allowedLocales={allowedLocales}
        open={expanded}
      ></UserMenu>
      <Switcher aria-label="Switcher Container">
        <Logout onLogout={onLogout} />
      </Switcher>
    </HeaderPanel>
  );
};

export default UserMenuPanel;

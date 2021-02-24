import React from "react";
import Logout from "../logout/logout.component";
import UserMenu from "../usermenu.component";
import {
  HeaderPanel,
  Switcher
} from "carbon-components-react/es/components/UIShell";
import {
  Button,
  HeaderPanelProps,
  SwitcherDivider
} from "carbon-components-react";
import { LoggedInUser, UserSession } from "../../types";
import UserAvatarFilledAlt20 from "@carbon/icons-react/es/user--avatar--filled--alt/20";
import styles from "./user-menu-panel.component.scss";
import Location20 from "@carbon/icons-react/es/location/20";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
const openmrsSpaBase = window["getOpenmrsSpaBase"]();

interface UserMenuPanelProps extends HeaderPanelProps {
  user: LoggedInUser;
  allowedLocales: any;
  onLogout(): void;
  session: UserSession;
}

const UserMenuPanel: React.FC<UserMenuPanelProps> = ({
  expanded,
  user,
  allowedLocales,
  onLogout,
  session
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const changeLocation = () => {
    history.push(`${openmrsSpaBase}login/location`, {
      referrer: window.location.pathname.slice(
        window.location.pathname.indexOf(openmrsSpaBase) +
          openmrsSpaBase.length -
          1
      )
    });
  };
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
      <Switcher className={styles.switcher} aria-label="Switcher Container">
        <UserAvatarFilledAlt20 />
        <p>{user.person.display}</p>
      </Switcher>
      <Switcher className={styles.switcher} aria-label="Switcher Container">
        <Location20 />
        <div>
          {session?.sessionLocation?.display}
          <Button onClick={changeLocation}>{t("change", "Change")}</Button>
        </div>
      </Switcher>
      <SwitcherDivider className={styles.divider} />
      <Switcher className={styles.switcher} aria-label="Switcher Container">
        <Button>{t("Settings", "Settings")}</Button>
      </Switcher>
      <Switcher className={styles.switcher} aria-label="Switcher Container">
        <Logout onLogout={onLogout} />
      </Switcher>
    </HeaderPanel>
  );
};

export default UserMenuPanel;

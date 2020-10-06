import React from "react";
import styles from "./usermenu.styles.css";
import { toggle } from "kremling";
import { LoggedInUser } from "../types";
import { ChangeLocale } from "./choose-locale/change-locale.component";

export interface UserMenuProps {
  open: boolean;
  user: LoggedInUser;
  allowedLocales: Array<string>;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  children,
  open,
  allowedLocales
}) => {
  return (
    <div
      className={toggle(styles.userMenu, styles.hidden, open)}
      role="button"
      onClick={evt => evt.stopPropagation()}
      tabIndex={-1}
    >
      <div className={`${styles.userMenuCard} omrs-padding-16`}>
        <div className="omrs-type-body-large omrs-margin-12">
          {user.person.display}
        </div>
        <ChangeLocale allowedLocales={allowedLocales} user={user} />
        {children}
      </div>
    </div>
  );
};

export default UserMenu;

import React from "react";
import styles from "./navbar.styles.css";
import { toggle } from "kremling";
import { LoggedInUser } from "../types";

export interface UserMenuProps {
  open: boolean;
  user: LoggedInUser;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, children, open }) => {
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
        {children}
      </div>
    </div>
  );
};

export default UserMenu;

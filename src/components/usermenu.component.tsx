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
  return <ChangeLocale allowedLocales={allowedLocales} user={user} />;
};

export default UserMenu;

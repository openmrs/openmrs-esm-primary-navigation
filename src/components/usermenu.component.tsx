import React from "react";
import { LoggedInUser } from "../types";
import { ChangeLocale } from "./choose-locale/change-locale.component";

export interface UserMenuProps {
  open: boolean;
  user: LoggedInUser;
  allowedLocales: Array<string>;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, allowedLocales }) => {
  return <ChangeLocale allowedLocales={allowedLocales} user={user} />;
};

export default UserMenu;

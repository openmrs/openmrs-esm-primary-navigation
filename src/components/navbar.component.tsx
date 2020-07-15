import React from "react";
import styles from "./navbar.styles.css";
import Logout from "./logout.component";
import Details from "./details.component";
import Location from "./location.component";
import UserMenu from "./usermenu.component";
import { Link } from "react-router-dom";
import { LoggedInUser } from "../types";

export interface NavbarProps {
  user: LoggedInUser;
  onLogout(): void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [sidenavOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();
  const toggleMenu = React.useCallback(
    () => setIsUserMenuOpen(current => !current),
    []
  );

  React.useEffect(() => {
    if (isUserMenuOpen) {
      window.addEventListener("click", toggleMenu);
      return () => window.removeEventListener("click", toggleMenu);
    }
  }, [isUserMenuOpen, toggleMenu]);

  React.useEffect(() => {
    if (sidenavOpen) {
      document.body.classList.add("omrs-sidenav-expanded");
      return () => document.body.classList.remove("omrs-sidenav-expanded");
    }
  }, [sidenavOpen]);

  return (
    <>
      <nav className={styles.topNav}>
        <Link to={`${openmrsSpaBase}home`}>
          <svg className="omrs-icon">
            <use xlinkHref="#omrs-icon-home" />
          </svg>
        </Link>
        <div className={`omrs-type-title-4 ${styles.logo}`}>
          <svg role="img" width="10rem">
            <use xlinkHref="#omrs-logo-partial-mono" />
          </svg>
        </div>
        <Location />
        <Details user={user} onToggle={toggleMenu} />
      </nav>
      <UserMenu user={user} open={isUserMenuOpen}>
        <Logout onLogout={onLogout} />
      </UserMenu>
    </>
  );
};

export default Navbar;

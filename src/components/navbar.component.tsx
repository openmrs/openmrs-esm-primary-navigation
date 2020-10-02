import React from "react";
import styles from "./navbar.styles.css";
import Logout from "./logout.component";
import Details from "./details.component";
import Location from "./location.component";
import UserMenu from "./usermenu.component";
import { Link } from "react-router-dom";
import { LoggedInUser, UserSession } from "../types";
import { ChangeLocation } from "./choose-location/change-location.component";

export interface NavbarProps {
  user: LoggedInUser;
  allowedLocales: Array<string>;
  onLogout(): void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, allowedLocales }) => {
  const [sidenavOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();
  const toggleMenu = React.useCallback(
    () => setIsUserMenuOpen(current => !current),
    []
  );
  const [displayChangeLocationUI, setDisplayChangeLocationUI] = React.useState(
    false
  );
  const toggleChangeLocationUI = React.useCallback(
    () => setDisplayChangeLocationUI(current => !current),
    []
  );

  React.useEffect(() => {
    if (isUserMenuOpen) {
      window.addEventListener("click", toggleMenu);
      return () => window.removeEventListener("click", toggleMenu);
    }
  }, [isUserMenuOpen, toggleMenu]);

  React.useEffect(() => {
    if (displayChangeLocationUI === true) {
      window.addEventListener("click", toggleChangeLocationUI);
      return () => window.removeEventListener("click", toggleChangeLocationUI);
    }
  }, [displayChangeLocationUI, toggleChangeLocationUI]);

  React.useEffect(() => {
    if (sidenavOpen) {
      document.body.classList.add("omrs-sidenav-expanded");
      return () => document.body.classList.remove("omrs-sidenav-expanded");
    }
  }, [sidenavOpen]);

  const reLoadLocation = (): void => {
    setDisplayChangeLocationUI(false);
  };

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
        <Location
          reLoadLocation={displayChangeLocationUI}
          toggleChangeLocationUI={toggleChangeLocationUI}
        />
        <Details user={user} onToggle={toggleMenu} />
      </nav>
      <UserMenu
        user={user}
        allowedLocales={allowedLocales}
        open={isUserMenuOpen}
      >
        <Logout onLogout={onLogout} />
      </UserMenu>
      {displayChangeLocationUI && (
        <ChangeLocation refreshLocation={reLoadLocation} />
      )}
    </>
  );
};

export default Navbar;

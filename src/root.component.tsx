import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import styles from "./root.styles.css";
import { toggle } from "kremling";
import { BrowserRouter, Redirect } from "react-router-dom";
import { getCurrentUser, openmrsFetch } from "@openmrs/esm-api";

function Root(props: NavProps) {
  const [sidenavOpen, setSidenavOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [userNames, setUserNames] = React.useState(null);
  const [userInitials, setUserInitials] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  React.useEffect(() => {
    const sub = getCurrentUser({ includeAuthStatus: true }).subscribe(user => {
      if (user.authenticated) {
        setIsLoggedIn(true);
        const { display } = user.user.person;
        setUserNames(display);
        setUserInitials(
          `${display.split(/\s/)[0][0]}${display.split(/\s/)[1][0]}`
        );
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    const operation = sidenavOpen ? "add" : "remove";
    document.body.classList[operation]("omrs-sidenav-expanded");

    return () => {
      document.body.classList.remove("omrs-sidenav-expanded");
    };
  }, [sidenavOpen]);

  React.useEffect(() => {
    const ac = new AbortController();
    if (isLoggingOut) {
      openmrsFetch("/ws/rest/v1/session", {
        method: "DELETE"
      }).then(() => setIsLoggedIn(false));
    }
    return () => ac.abort();
  }, [isLoggingOut]);

  React.useEffect(() => {
    if (isUserMenuOpen) {
      window.addEventListener("click", closePopup);
      return () => window.removeEventListener("click", closePopup);
    }
    function closePopup() {
      setIsUserMenuOpen(false);
    }
  });

  return (
    <BrowserRouter>
      <>
        {!isLoggedIn && (
          <Redirect
            // @ts-ignore
            to={`${window.getOpenmrsSpaBase()}login`}
          />
        )}
        <nav className={styles.topNav}>
          <button
            className="omrs-unstyled omrs-padding-left-4 omrs-padding-right-4"
            onClick={toggleSidenav}
          >
            <svg className={`omrs-icon ${styles.menuIcon}`}>
              <use xlinkHref="#omrs-icon-menu" />
            </svg>
          </button>
          <div className="omrs-type-title-4">
            {/* We'll figure out whether to use document.title or not later */}
            Home
          </div>
          <div>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`omrs-unstyled ${styles.avatar}`}
            >
              {userInitials}
            </button>
          </div>
        </nav>
        <div
          className={toggle(styles.userMenu, styles.hidden, isUserMenuOpen)}
          role="button"
          onClick={evt => evt.stopPropagation()}
          tabIndex={-1}
        >
          <div className={`${styles.userMenuCard} omrs-padding-16`}>
            <div className="omrs-type-body-large omrs-margin-12">
              {userNames}
            </div>
            <button
              onClick={() => setIsLoggingOut(true)}
              className="omrs-btn omrs-outlined-neutral"
            >
              Logout
            </button>
          </div>
        </div>
      </>
    </BrowserRouter>
  );

  function toggleSidenav() {
    setSidenavOpen(!sidenavOpen);
  }
}

type NavProps = {
  history?: any;
};

export default openmrsRootDecorator({ featureName: "primary navigation" })(
  Root
);

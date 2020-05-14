import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import styles from "./root.styles.css";
import { toggle } from "kremling";
import { BrowserRouter, Redirect, withRouter, Link } from "react-router-dom";
import { getCurrentUser, openmrsFetch } from "@openmrs/esm-api";
import { createErrorHandler } from "@openmrs/esm-error-handling";

export function Root(props: NavProps) {
  const [sidenavOpen, setSidenavOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();

  React.useEffect(() => {
    const sub = getCurrentUser({ includeAuthStatus: true }).subscribe(
      response => {
        if (response.authenticated) {
          setIsLoggedIn(true);
          setUser(response.user);
        } else {
          setIsLoggedIn(false);
        }
        createErrorHandler();
      }
    );
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
            to={{
              pathname: `${openmrsSpaBase}login`,
              state: {
                referrer: window.location.pathname.slice(
                  window.location.pathname.indexOf(openmrsSpaBase) +
                    openmrsSpaBase.length -
                    1
                )
              }
            }}
          />
        )}
        <nav className={styles.topNav}>
          <Link to={`${openmrsSpaBase}home`}>
            <svg className="omrs-icon">
              <use xlinkHref="#omrs-icon-home"></use>
            </svg>
          </Link>
          <div className="omrs-type-title-4">
            <svg role="img" width="10rem">
              <use xlinkHref="#omrs-logo-partial-color"></use>
            </svg>
          </div>
          <div>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`omrs-unstyled ${styles.userPopup}`}
            >
              {user ? user.username : ""}
              <svg
                className="omrs-icon"
                fill="var(--omrs-color-ink-medium-contrast)"
              >
                <use xlinkHref="#omrs-icon-chevron-down" />
              </svg>
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
              {user ? user.person.display : ""}
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

export default openmrsRootDecorator({
  featureName: "primary navigation",
  moduleName: "@openmrs/esm-primary-navigation"
})(Root);

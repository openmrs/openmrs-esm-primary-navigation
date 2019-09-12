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

  React.useEffect(() => {
    const sub = getCurrentUser().subscribe(({ person }) => {
      const { display } = person;
      setUserNames(display);
      setUserInitials(
        `${display.split(/\s/)[0][0]}${display.split(/\s/)[1][0]}`
      );
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

  function logout() {
    return openmrsFetch("/ws/rest/v1/session", {
      method: "DELETE"
    }).then(() => setIsLoggedIn(false));
  }

  function getOpenmrsSpaBase() {
    // @ts-ignore
    return window.getOpenmrsSpaBase();
  }
  return (
    <BrowserRouter>
      <>
        {!isLoggedIn && <Redirect to={`${getOpenmrsSpaBase()}login`} />}
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
        <div className={toggle(styles.userMenu, styles.hidden, isUserMenuOpen)}>
          <div className={`${styles.userMenuCard} omrs-padding-16`}>
            <div className="omrs-type-body-large omrs-margin-12">
              {userNames}
            </div>
            <button onClick={logout} className="omrs-btn omrs-outlined-neutral">
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

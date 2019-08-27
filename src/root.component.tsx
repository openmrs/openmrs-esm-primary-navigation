import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import styles from "./root.styles.css";

function Root() {
  const [sidenavOpen, setSidenavOpen] = React.useState(false);

  React.useEffect(() => {
    const operation = sidenavOpen ? "add" : "remove";
    document.body.classList[operation]("omrs-sidenav-expanded");

    return () => {
      document.body.classList.remove("omrs-sidenav-expanded");
    };
  }, [sidenavOpen]);

  return (
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
      <div className={styles.avatar}>AB</div>
    </nav>
  );

  function toggleSidenav() {
    setSidenavOpen(!sidenavOpen);
  }
}

export default openmrsRootDecorator({ featureName: "primary navigation" })(
  Root
);

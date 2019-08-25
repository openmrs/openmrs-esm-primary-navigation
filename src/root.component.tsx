import React from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import styles from "./root.styles.css";

function Root() {
  return (
    <nav className={styles.topNav}>
      <button className="omrs-unstyled omrs-padding-left-4 omrs-padding-right-4">
        <svg className="omrs-icon">
          <use xlinkHref="#omrs-icon-menu" />
        </svg>
      </button>
      <div>
        {/* We'll figure out whether to use document.title or not later */}
        Home
      </div>
      <div>AB</div>
    </nav>
  );
}

export default openmrsRootDecorator({ featureName: "primary navigation" })(
  Root
);

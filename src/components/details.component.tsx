import React from "react";
import styles from "./details.styles.css";
import { LoggedInUser } from "../types";

export interface DetailsProps {
  user: LoggedInUser;
  onToggle(): void;
}

const Details: React.FC<DetailsProps> = ({ user, onToggle }) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`omrs-unstyled ${styles.userPopup}`}
      >
        {user.username}
        <svg className="omrs-icon" fill="var(--omrs-color-ink-medium-contrast)">
          <use xlinkHref="#omrs-icon-chevron-down" />
        </svg>
      </button>
    </div>
  );
};

export default Details;

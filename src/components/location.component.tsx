import React from "react";
import styles from "./location.styles.css";
import { openmrsFetch } from "@openmrs/esm-api";
import { UserSession } from "../types";

export interface LocationProps {
  reLoadLocation: boolean;
  toggleChangeLocationUI(): void;
}

const Location: React.FC<LocationProps> = (props: LocationProps) => {
  const [session, setSession] = React.useState<UserSession>(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    openmrsFetch("/ws/rest/v1/appui/session", {
      signal: abortController.signal
    }).then(({ data }) => setSession(data));
  }, [props.reLoadLocation]);

  return (
    <div
      className={styles.location}
      tabIndex={-1}
      role="button"
      onClick={props.toggleChangeLocationUI}
    >
      <span>
        <span>
          <svg className={styles.locSvg}>
            <use xlinkHref="#omrs-icon-location" />
          </svg>
        </span>
        <span>{session?.sessionLocation?.display}</span>
      </span>
    </div>
  );
};

export default Location;

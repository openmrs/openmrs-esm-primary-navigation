import React, { useEffect, useState } from "react";
import { ExtensionSlot, createErrorHandler } from "@openmrs/esm-framework";
import { getCurrentSession } from "../../root.resource";
import {
  setSessionLocation,
  searchLocationsFhir
} from "./change-location.resource";
import styles from "./change-location.styles.css";

type ChangeLocationProps = {
  LoadLocations: boolean;
  refreshLocation(): void;
};

export function ChangeLocation(props: ChangeLocationProps) {
  const [locationUuid, setLocationUuid] = useState();
  const [currentUser, setCurrentUser] = useState<string>();
  const [location, setLocations] = useState<Array<any>>();

  useEffect(() => {
    if (props.LoadLocations) {
      const ac = new AbortController();
      getCurrentSession(ac).then(({ data }) => {
        setLocationUuid(data.sessionLocation.uuid);
        setCurrentUser(data.user.display);
      }, createErrorHandler());
      return () => ac.abort();
    }
  }, []);

  useEffect(() => {
    if (props.LoadLocations) {
      const ac = new AbortController();
      searchLocationsFhir("", ac).then(
        ({ data }) => setLocations(data.entry),
        createErrorHandler()
      );
      return () => ac.abort();
    }
  }, [props.LoadLocations]);

  function onChangeLocation(locationUuid: string) {
    const ac = new AbortController();
    setSessionLocation(locationUuid, ac).then((response: any) => {
      if (response.status === 200) {
        props.refreshLocation();
      }
    });
  }

  return (
    <div
      className={styles.changeLocationContainer}
      onClick={evt => evt.stopPropagation()}
      role="button"
      tabIndex={-1}
    >
      {location && locationUuid && (
        <ExtensionSlot
          extensionSlotName="location-picker"
          state={{
            loginLocations: location,
            onChangeLocation,
            hideWelcomeMessage: true,
            currentLocationUuid: locationUuid,
            currentUser: currentUser
          }}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Parcel from "single-spa-react/parcel";
import { getCurrentSession } from "../root.resource";
import {
  setSessionLocation,
  searchLocationsFhir
} from "./change-location.resource";
import { createErrorHandler } from "@openmrs/esm-error-handling";

type ChangeLocationProps = {
  refreshLocation(currentSession): void;
};

export function ChangeLocation(props: ChangeLocationProps) {
  const [locationUuid, setLocationUuid] = useState();
  const [currentUser, setCurrentUser] = useState<string>();
  const [location, setLocations] = useState<Array<any>>();

  useEffect(() => {
    const ac = new AbortController();
    getCurrentSession(ac).then(({ data }) => {
      setLocationUuid(data.sessionLocation.uuid);
      setCurrentUser(data.user.display);
    }, createErrorHandler());
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    searchLocationsFhir("", ac).then(
      ({ data }) => setLocations(data.entry),
      createErrorHandler()
    );
  }, []);

  function onChangeLocation(locationUuid: string) {
    const ac = new AbortController();
    setSessionLocation(locationUuid, ac).then((response: any) => {
      if (response.status === 200) {
        props.refreshLocation(response.data);
      }
    });
  }

  return (
    <div>
      {location && locationUuid && (
        <Parcel
          config={() =>
            System.import("@openmrs/esm-login-app").then(
              mod => mod.LocationPickerParcel
            )
          }
          {...{
            loginLocations: location,
            onChangeLocation: onChangeLocation,
            hideWelcomeMessage: true,
            currentLocationUuid: locationUuid,
            currentUser: currentUser
          }}
        />
      )}
    </div>
  );
}

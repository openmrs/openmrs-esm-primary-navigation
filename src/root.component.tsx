import React, { useState } from "react";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import styles from "./root.styles.css";
import Navbar from "./components/navbar.component";
import { BrowserRouter, Redirect } from "react-router-dom";
import { getCurrentUser } from "@openmrs/esm-api";
import { createErrorHandler } from "@openmrs/esm-error-handling";
import { LoggedInUser } from "./types";

export function Root() {
  const [user, setUser] = React.useState<LoggedInUser | null | false>(null);
  const logout = React.useCallback(() => setUser(false), []);
  const openmrsSpaBase = window["getOpenmrsSpaBase"]();
  const [refreshLocation, setRefreshLocation] = useState<boolean>();

  React.useEffect(() => {
    const sub = getCurrentUser({ includeAuthStatus: true }).subscribe(
      response => {
        if (response.authenticated) {
          setUser(response.user);
        } else {
          setUser(false);
        }

        createErrorHandler();
      }
    );
    return () => sub.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.primaryNavContainer}>
        {user === false ? (
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
        ) : (
          user && <Navbar user={user} onLogout={logout} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default openmrsRootDecorator({
  featureName: "primary navigation",
  moduleName: "@openmrs/esm-primary-navigation-app"
})(Root);

import React from 'react';
import styles from './root.styles.css';
import Navbar from './components/navbar/navbar.component';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { getCurrentUser, createErrorHandler } from '@openmrs/esm-framework';
import { LoggedInUser, UserSession } from './types';
import { getCurrentSession } from './root.resource';
import { useLoggedInUserPropertiesSync } from './offline/user-locale';

export default function Root() {
  const [user, setUser] = React.useState<LoggedInUser | null | false>(null);
  const [allowedLocales, setAllowedLocales] = React.useState();
  const logout = React.useCallback(() => setUser(false), []);
  const openmrsSpaBase = window['getOpenmrsSpaBase']();
  const [userSession, setUserSession] = React.useState<UserSession>(null);

  useLoggedInUserPropertiesSync();

  React.useEffect(() => {
    const currentUserSub = getCurrentUser({ includeAuthStatus: true }).subscribe(response => {
      setAllowedLocales(response['allowedLocales']);
      if (response.authenticated) {
        setUser(response.user);
      } else {
        setUser(false);
      }

      createErrorHandler();
    });

    const currentSessionSub = getCurrentSession().subscribe(({ data }) => setUserSession(data));

    return () => {
      currentUserSub.unsubscribe();
      currentSessionSub.unsubscribe();
    };
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
                  window.location.pathname.indexOf(openmrsSpaBase) + openmrsSpaBase.length - 1,
                ),
              },
            }}
          />
        ) : (
          user && <Navbar allowedLocales={allowedLocales} user={user} onLogout={logout} session={userSession} />
        )}
      </div>
    </BrowserRouter>
  );
}

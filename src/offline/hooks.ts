import { getCurrentUser, LoggedInUser } from '@openmrs/esm-framework';
import React, { useState, useEffect } from 'react';

export function useLoggedInUser(): LoggedInUser | null {
  const [user, setUser] = useState<LoggedInUser>(null);

  useEffect(() => {
    const sub = getCurrentUser({ includeAuthStatus: true }).subscribe(u => setUser(u?.user ?? null));
    return () => sub.unsubscribe();
  }, []);

  return user;
}

/**
 * Returns whether the website is currently offline.
 * Can be used to dynamically present different content depending on the network connection state.
 * The value automatically updates when the window's `offline` and `online` events are raised.
 * @returns `true` if the website is currently in offline mode; `false` if not.
 */
export function useIsOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const onNetworkChanged = () => setIsOffline(navigator.onLine);

  useEffect(() => {
    window.addEventListener('offline', onNetworkChanged);
    window.addEventListener('online', onNetworkChanged);

    return () => {
      window.removeEventListener('offline', onNetworkChanged);
      window.removeEventListener('online', onNetworkChanged);
    };
  }, []);

  return isOffline;
}

/**
 * Runs the specified `effect` when the website goes online.
 * @param effect The effect to be run when the application (re-)connects to the network.
 */
export function useOnlineEffect(effect: React.EffectCallback, additionalDeps?: React.DependencyList) {
  const isOffline = useIsOffline();

  useEffect(() => {
    if (!isOffline) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOffline, effect, ...(additionalDeps ?? [])]);
}

/**
 * Depending on the current network state, returns either `online` or `offline`.
 * @param online The value to be returned when a network connection is available.
 * @param offline The value to be returned when no network connection is available.
 * @returns Either `online` or `offline`, depending on whether a network connection is available.
 */
export function useNetworkDependent<T>(online: T, offline: T) {
  const isOffline = useIsOffline();
  return isOffline ? online : offline;
}

import { useState, useEffect } from 'react';

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

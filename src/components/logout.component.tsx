import React from "react";
import { openmrsFetch, refetchCurrentUser } from "@openmrs/esm-api";

export interface LogoutProps {
  onLogout(): void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  React.useEffect(() => {
    const ac = new AbortController();
    if (isLoggingOut) {
      openmrsFetch("/ws/rest/v1/session", {
        method: "DELETE"
      })
        .then(refetchCurrentUser)
        .then(onLogout);
    }
    return () => ac.abort();
  }, [isLoggingOut, onLogout]);

  return (
    <button
      onClick={() => setIsLoggingOut(true)}
      className="omrs-btn omrs-outlined-neutral"
    >
      Logout
    </button>
  );
};

export default Logout;

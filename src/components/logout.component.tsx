import React from "react";
import { openmrsFetch, refetchCurrentUser } from "@openmrs/esm-api";
import { SwitcherItem } from "carbon-components-react/es/components/UIShell";

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
    <SwitcherItem
      isSelected
      onClick={() => setIsLoggingOut(true)}
      aria-labelledby="Logout"
      role="button"
    >
      Logout
    </SwitcherItem>
  );
};

export default Logout;

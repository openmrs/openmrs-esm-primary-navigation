import { refetchCurrentUser } from "@openmrs/esm-api";
import React, { useEffect, useState } from "react";
import { updateUserProperties } from "./change-locale.resource";

interface ChangeLocaleProps {
  allowedLocales: Array<string>;
  user: any;
}

export const ChangeLocale: React.FC<ChangeLocaleProps> = ({
  allowedLocales,
  user
}) => {
  const [userProps, setUserProps] = useState(user.userProperties);
  const options = allowedLocales?.map(locale => (
    <option value={locale} key={locale}>
      {locale}
    </option>
  ));

  useEffect(() => {
    if (user.userProperties.defaultLocale !== userProps.defaultLocale) {
      updateUserProperties(user.uuid, userProps, new AbortController()).then(
        response => {
          if (response.ok) {
            refetchCurrentUser();
          }
        }
      );
    }
  }, [userProps]);

  return (
    <div className="omrs-margin-12">
      <label htmlFor="selectLocale">
        <span>Select Locale</span>
      </label>
      <select
        value={userProps.defaultLocale}
        aria-label="selectLocale"
        onChange={event =>
          setUserProps({ ...userProps, defaultLocale: event.target.value })
        }
      >
        {options}
      </select>
    </div>
  );
};

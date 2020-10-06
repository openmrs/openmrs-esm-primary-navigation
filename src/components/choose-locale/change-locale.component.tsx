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
      const ac = new AbortController();
      updateUserProperties(user.uuid, userProps, ac).then(response => {
        if (response.ok) {
          refetchCurrentUser();
        }
      });
      return () => ac.abort();
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

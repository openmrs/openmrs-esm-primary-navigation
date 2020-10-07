import { refetchCurrentUser } from "@openmrs/esm-api";
import { Select, SelectItem, SelectItemGroup } from "carbon-components-react";
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
    <SelectItem text={locale} value={locale} key={locale} />
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
      <Select
        name="selectLocale"
        id="selectLocale"
        invalidText="A valid value locale is required"
        labelText="Select locale"
        onChange={event =>
          setUserProps({ ...userProps, defaultLocale: event.target.value })
        }
        value={userProps.defaultLocale}
      >
        {options}
      </Select>
    </div>
  );
};

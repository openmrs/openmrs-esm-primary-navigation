import React, { useEffect, useState } from 'react';
import Select from 'carbon-components-react/es/components/Select';
import SelectItem from 'carbon-components-react/es/components/SelectItem';
import { refetchCurrentUser } from '@openmrs/esm-framework';
import { updateUserProperties } from './change-locale.resource';
import styles from './changelocal.component.scss';

interface ChangeLocaleProps {
  allowedLocales: Array<string>;
  user: any;
}

const ChangeLocale: React.FC<ChangeLocaleProps> = ({ allowedLocales, user }) => {
  const [userProps, setUserProps] = useState(user.userProperties);
  const options = allowedLocales?.map(locale => <SelectItem text={locale} value={locale} key={locale} />);

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
    <div className={`omrs-margin-12 ${styles.labelselect}`}>
      <Select
        name="selectLocale"
        id="selectLocale"
        invalidText="A valid value locale is required"
        labelText="Select locale"
        onChange={event => setUserProps({ ...userProps, defaultLocale: event.target.value })}
        value={userProps.defaultLocale}>
        {options}
      </Select>
    </div>
  );
};

export default ChangeLocale;

import React, { useEffect, useState } from 'react';
import Select from 'carbon-components-react/es/components/Select';
import SelectItem from 'carbon-components-react/es/components/SelectItem';
import styles from './changelocal.component.scss';
import { usePostUserLocale } from '../../offline/user-locale';

interface ChangeLocaleProps {
  allowedLocales: Array<string>;
  user: any;
}

const ChangeLocale: React.FC<ChangeLocaleProps> = ({ allowedLocales, user }) => {
  const postUserLocale = usePostUserLocale();
  const [userProps, setUserProps] = useState(user.userProperties);
  const options = allowedLocales?.map(locale => <SelectItem text={locale} value={locale} key={locale} />);

  useEffect(() => {
    if (user.userProperties.defaultLocale === userProps.defaultLocale) {
      return;
    }

    const ac = new AbortController();
    postUserLocale(userProps.defaultLocale);
    return () => ac.abort();
  }, [user, userProps, postUserLocale]);

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

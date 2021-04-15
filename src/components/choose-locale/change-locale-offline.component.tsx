import React from 'react';
import { postUserPropertiesOffline } from '../../offline/user-properties.resource';
import ChangeLocale, { ChangeLocaleProps } from './change-locale.component';

const ChangeLocaleOffline: React.FC<ChangeLocaleProps> = props => (
  <ChangeLocale {...props} postUserProperties={postUserPropertiesOffline} />
);

export default ChangeLocaleOffline;

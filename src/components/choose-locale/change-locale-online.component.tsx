import React from 'react';
import { postUserPropertiesOnline } from './change-locale-online.resource';
import ChangeLocale, { ChangeLocaleProps } from './change-locale.component';

const ChangeLocaleOffline: React.FC<ChangeLocaleProps> = props => (
  <ChangeLocale {...props} postUserProperties={postUserPropertiesOnline} />
);

export default ChangeLocaleOffline;

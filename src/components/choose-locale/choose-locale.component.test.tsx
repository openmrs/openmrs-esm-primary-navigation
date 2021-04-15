import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangeLocale from './change-locale.component';

const allowedLocales = ['en', 'fr', 'it', 'pt'];
const user = {
  uuid: 'uuid',
  userProperties: {
    defaultLocale: 'fr',
  },
};

describe(`<ChangeLocale />`, () => {
  let wrapper;
  beforeEach(() => (wrapper = render(<ChangeLocale allowedLocales={allowedLocales} user={user} />)));

  it("should have user's defaultLocale as initial value", async () => {
    expect(screen.getByLabelText(/Select locale/)).toHaveValue('fr');
  });
});

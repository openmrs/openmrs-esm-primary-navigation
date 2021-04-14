import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import ChangeLocale from './change-locale.component';
import * as backendController from './change-locale.resource';

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

  it('should change user locale', async () => {
    spyOn(backendController, 'updateUserProperties').and.returnValue(Promise.resolve({}));
    fireEvent.change(screen.getByLabelText(/select Locale/i), {
      target: { value: 'en' },
    });
    await wait();

    expect(backendController.updateUserProperties).toHaveBeenCalledWith(
      'uuid',
      {
        defaultLocale: 'en',
      },
      expect.anything(),
    );
  });
});

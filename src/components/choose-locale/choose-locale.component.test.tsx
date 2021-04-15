import React from 'react';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import ChangeLocale from './change-locale.component';
import * as backendController from '../../offline/user-properties.resource';

const allowedLocales = ['en', 'fr', 'it', 'pt'];
const user: any = {
  uuid: 'uuid',
  userProperties: {
    defaultLocale: 'fr',
  },
};

describe(`<ChangeLocale />`, () => {
  let wrapper;
  beforeEach(
    () =>
      (wrapper = render(
        <ChangeLocale
          allowedLocales={allowedLocales}
          user={user}
          postUserProperties={backendController.postUserPropertiesOnline}
        />,
      )),
  );

  it("should have user's defaultLocale as initial value", async () => {
    expect(screen.getByLabelText(/Select locale/)).toHaveValue('fr');
  });

  it('should change user locale', async () => {
    spyOn(backendController, 'postUserPropertiesOnline').and.returnValue(Promise.resolve({}));
    fireEvent.change(screen.getByLabelText(/select Locale/i), {
      target: { value: 'en' },
    });
    await wait();

    expect(backendController.postUserPropertiesOnline).toHaveBeenCalledWith(
      user.uuid,
      {
        defaultLocale: 'en',
      },
      expect.anything(),
    );
  });
});

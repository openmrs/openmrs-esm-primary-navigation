import React from 'react';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import ChangeLocale from './change-locale.component';

const allowedLocales = ['en', 'fr', 'it', 'pt'];
const user: any = {
  uuid: 'uuid',
  userProperties: {
    defaultLocale: 'fr',
  },
};

describe(`<ChangeLocale />`, () => {
  let postUserPropertiesMock = jest.fn(() => Promise.resolve({}));

  beforeEach(() => {
    postUserPropertiesMock = jest.fn(() => Promise.resolve({}));
    render(<ChangeLocale allowedLocales={allowedLocales} user={user} postUserProperties={postUserPropertiesMock} />);
  });

  it("should have user's defaultLocale as initial value", async () => {
    expect(screen.getByLabelText(/Select locale/)).toHaveValue('fr');
  });

  it('should change user locale', async () => {
    fireEvent.change(screen.getByLabelText(/Select locale/i), { target: { value: 'en' } });
    await wait(() =>
      expect(postUserPropertiesMock).toHaveBeenCalledWith(user.uuid, { defaultLocale: 'en' }, expect.anything()),
    );
  });
});

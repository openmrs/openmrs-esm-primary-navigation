import React from 'react';
import { screen, render } from '@testing-library/react';
import UserPanelSwitcher from './user-panel-switcher.component';
import { mockLoggedInUser } from '../../../__mocks__/mock-user';
import userEvent from '@testing-library/user-event';

const mockLogout = jest.fn();

describe('<UserPanelSwitcher/>', () => {
  const allowedLocales = ['en', 'fr', 'it', 'pt'];
  beforeEach(() => {
    render(<UserPanelSwitcher user={mockLoggedInUser} allowedLocales={allowedLocales} onLogout={mockLogout} />);
  });

  it('should display user name and logout button', async () => {
    expect(await screen.findByText(/Dr Healther Morgan/i)).toBeInTheDocument();
    const logoutButton = await screen.findByRole('button', { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
});

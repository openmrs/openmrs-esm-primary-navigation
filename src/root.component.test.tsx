import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { of } from 'rxjs';
import { isDesktop } from './utils';
import { getCurrentUser, openmrsObservableFetch, useConfig } from '@openmrs/esm-framework';
import Root from './root.component';
import { mockUser } from '../__mocks__/mock-user';

const mockGetCurrentUser = getCurrentUser as jest.Mock;
const mockOpenmrsObservableFetch = openmrsObservableFetch as jest.Mock;
const mockUseConfig = useConfig as jest.Mock;

jest.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  createErrorHandler: jest.fn(),
  openmrsObservableFetch: jest.fn(),
  getCurrentUser: jest.fn().mockImplementation(() => ({ subscribe: () => {}, unsubscribe: () => {} })),
  ExtensionSlot: jest.fn().mockImplementation(({ children }) => <>{children}</>),
  useLayoutType: jest.fn(() => 'tablet'),
  useConfig: jest.fn(),
}));

jest.mock('./utils', () => ({ isDesktop: jest.fn(() => false) }));

describe(`<Root />`, () => {
  beforeEach(() => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    mockOpenmrsObservableFetch.mockImplementation(() =>
      of({ data: { sessionLocation: { display: 'Unknown Location' } } }),
    );
    mockUseConfig.mockReturnValue({
      logo: { src: null, alt: null, name: 'Mock EMR' },
    });
    render(<Root />);
  });

  afterEach(() => {
    mockGetCurrentUser.mockReset();
    mockOpenmrsObservableFetch.mockReset();
  });

  it('should display navbar with title', async () => {
    expect(screen.getByRole('button', { name: /Users/i })).toBeInTheDocument();
    expect(screen.getByRole('banner', { name: /OpenMRS/i })).toBeInTheDocument();
    expect(screen.getByText(/Mock EMR/i)).toBeInTheDocument();
  });

  it('should open user-menu panel', async () => {
    const userButton = await screen.findByRole('button', { name: /Users/i });
    fireEvent.click(userButton);
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });

  describe('when view is desktop', () => {
    let component;

    beforeEach(() => {
      (isDesktop as jest.Mock).mockImplementation(() => true);
      component = render(<Root />);
    });

    it('does not render side menu button if desktop', () => {
      waitForElementToBeRemoved(() => component.getByLabelText('Open menu')).then(() => {
        expect(component.queryAllByLabelText('Open menu')).toHaveLength(0);
      });
    });
  });
});

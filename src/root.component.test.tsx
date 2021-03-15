import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { of } from "rxjs";
import {
  getCurrentUser,
  openmrsObservableFetch,
  createErrorHandler
} from "@openmrs/esm-framework";
import Root from "./root.component";
import { mockUser } from "../__mocks__/mock-user";

const mockGetCurrentUser = getCurrentUser as jest.Mock;
const mockOpenmrsObservableFetch = openmrsObservableFetch as jest.Mock;
const mockCreateErrorHandler = createErrorHandler as jest.Mock;

jest.mock("@openmrs/esm-framework", () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  createErrorHandler: jest.fn(),
  openmrsObservableFetch: jest.fn(),
  getCurrentUser: jest
    .fn()
    .mockImplementation(() => ({ subscribe: () => {}, unsubscribe: () => {} })),
  ExtensionSlot: jest.fn().mockImplementation(({ children }) => <>{children}</>)
}));

describe(`<Root />`, () => {
  beforeEach(() => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    mockOpenmrsObservableFetch.mockImplementation(() =>
      of({ data: { sessionLocation: { display: "Unknown Location" } } })
    );
    render(<Root />);
  });

  afterEach(() => {
    mockGetCurrentUser.mockReset();
    mockOpenmrsObservableFetch.mockReset();
  });

  it("should display navbar with title", async () => {
    expect(screen.getByRole("button", { name: /Users/i })).toBeInTheDocument();
    expect(
      screen.getByRole("banner", { name: /OpenMRS/i })
    ).toBeInTheDocument();
  });

  it("should open user-menu panel", async () => {
    const userButton = await screen.findByRole("button", { name: /Users/i });
    fireEvent.click(userButton);
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });
});

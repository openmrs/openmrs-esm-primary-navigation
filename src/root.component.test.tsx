import React from "react";
import { render, screen } from "@testing-library/react";
import { of } from "rxjs";
import { getCurrentUser, ExtensionSlot } from "@openmrs/esm-framework";
import Root from "./root.component";

const mockGetCurrentUser = getCurrentUser as jest.Mock;

window["getOpenmrsSpaBase"] = jest.fn().mockImplementation(() => "/");

const mockUser = {
  authenticated: true,
  user: {
    uuid: "uuid",
    display: "admin",
    person: { uuid: "uuid", display: "Test User" },
    privileges: [],
    roles: [{ uuid: "uuid", display: "System Developer" }],
    username: "testuser",
    userProperties: {
      defaultLocale: "fr"
    }
  }
};

jest.mock("@openmrs/esm-framework", () => ({
  ExtensionSlot: () => null,
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest
    .fn()
    .mockImplementation(() => ({ subscribe: () => {}, unsubscribe: () => {} })),
  ExtensionSlot: jest.fn().mockImplementation(({ children }) => <>{children}</>)
}));

describe(`<Root />`, () => {
  let wrapper;

  beforeEach(() => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    wrapper = render(<Root />);
  });

  it("should display navbar with title", async () => {
    expect(screen.getByRole("button", { name: /Users/i })).toBeInTheDocument();
    expect(
      screen.getByRole("banner", { name: /OpenMRS/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
  });
});

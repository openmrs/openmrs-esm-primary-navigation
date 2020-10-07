import React from "react";
import { render, screen } from "@testing-library/react";
import { Root } from "./root.component";
import { of } from "rxjs";
import { getCurrentUser, openmrsFetch } from "@openmrs/esm-api";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    match = { params: {}, isExact: true, path: "", url: "" }
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
    match
  };
}

const mockGetCurrentUser = getCurrentUser as jest.Mock;
const mockOpenMrsFetch = openmrsFetch as jest.Mock;

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

jest.mock("@openmrs/esm-api", () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest
    .fn()
    .mockImplementation(() => ({ subscribe: () => {}, unsubscribe: () => {} }))
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
    expect(
      screen.getByRole("button", { name: /Location/i })
    ).toBeInTheDocument();
  });
});

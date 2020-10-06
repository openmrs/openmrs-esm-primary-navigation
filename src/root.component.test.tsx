import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
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
afterAll(cleanup);

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
      defaultLocale: "en"
    }
  },
  allowedLocales: ["en", "fr", "it", "pt"]
};

jest.mock("@openmrs/esm-api", () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest
    .fn()
    .mockImplementation(() => ({ subscribe: () => {}, unsubscribe: () => {} }))
}));

describe(`<Root />`, () => {
  it("renders avatar", async () => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    const wrapper = render(<Root />);
    await wait(() => expect(wrapper.getByText("testuser")).not.toBeNull());
  });

  it("logs out patient", async () => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    const wrapper = renderWithRouter(<Root />);

    fireEvent.click(wrapper.getByText("testuser"));

    fireEvent.click(wrapper.getByText(/Logout/i));

    await wait(() => {
      expect(mockOpenMrsFetch).toHaveBeenCalledWith("/ws/rest/v1/session", {
        method: "DELETE"
      });
    });
  });

  it("should show selected location in navigation header", async () => {
    mockOpenMrsFetch.mockImplementation(() => {
      return Promise.resolve({
        data: {
          sessionLocation: { display: "Registration Desk" }
        }
      });
    });
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    const wrapper = render(<Root />);

    await wait(() => {
      expect(wrapper.queryByText("Registration Desk")).toBeInTheDocument();
    });
  });
});

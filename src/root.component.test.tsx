import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import Root from "./root.component";
import { of } from "rxjs";
import { getCurrentUser, openmrsFetch } from "@openmrs/esm-api";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

const mockGetCurrentUser = getCurrentUser as jest.Mock;
window["getOpenmrsSpaBase"] = jest.fn().mockImplementation(() => "/");
afterAll(cleanup);

const mockUser = {
  uuid: "uuid",
  display: "admin",
  person: { uuid: "uuid", display: "Test User" },
  privileges: [],
  roles: [{ uuid: "uuid", display: "System Developer" }]
};

jest.mock("@openmrs/esm-api", () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest
    .fn()
    .mockImplementation(() => ({ subscribe: () => {}, unsubscribe: () => {} }))
}));

describe(`<Root />`, () => {
  it(`renders without dying`, () => {
    let wrapper;
    act(() => {
      wrapper = render(<Root />);
    });
  });

  it(`renders avatar`, async () => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    let wrapper;
    act(() => {
      wrapper = render(<Root />);
    });
    await wait(() => expect(wrapper.getByText("TU")).not.toBeNull());
  });

  it(`logs out patient`, async () => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    let wrapper;
    act(() => {
      wrapper = render(<Root />);
    });
    const userMenuBtn = wrapper.container.querySelector(".avatar");
    act(() => {
      fireEvent.click(userMenuBtn);
    });
    const logoutBtn = wrapper.getByText(/Logout/i);
    expect(logoutBtn).not.toBeNull();
    act(() => {
      fireEvent.click(logoutBtn);
    });
    // ToDo: figure out how to test Redirect with react-testing-library
  });
});

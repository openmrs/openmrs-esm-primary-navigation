import { LoggedInUser } from "../src/types";

export const mockUser = {
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

export const mockLoggedInUser: LoggedInUser = {
  username: "Dr Healther Morgan",
  person: {
    display: "Dr Healther Morgan"
  }
};

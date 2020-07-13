export interface LoggedInUser {
  username: string;
  person: {
    display: string;
  };
}

export interface UserSession {
  sessionLocation?: {
    display: string;
  };
}

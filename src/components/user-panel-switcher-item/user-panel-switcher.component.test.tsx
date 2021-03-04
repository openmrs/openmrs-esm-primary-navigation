import React from "react";
import { screen, render } from "@testing-library/react";
import UserPanelSwitcher from "./user-panel-switcher.component";

const mockLogout = jest.fn();

describe("<UserPanelSwitcher/>", () => {
  beforeEach(() => {
    render(
      <UserPanelSwitcher
        user={null}
        allowedLocales={null}
        onLogout={mockLogout}
      />
    );
  });

  it("should display switcher item", () => {
    pending();
  });
});

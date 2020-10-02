import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { ChangeLocale } from "./change-locale.component";
import * as backendController from "./change-locale.resource";

describe(`<ChangeLocale />`, () => {
  const setupLocaleSelect = async () => {
    const wrapper = render(
      <ChangeLocale
        allowedLocales={["en", "fr", "it", "pt"]}
        user={{
          uuid: "uuid",
          userProperties: {
            defaultLocale: "en"
          }
        }}
      />
    );
    await wait();

    return wrapper.getByDisplayValue("en") as HTMLInputElement;
  };

  it("should have user's defaultLocale as initial value", async () => {
    expect((await setupLocaleSelect()).value).toBe("en");
  });

  it("should change user locale", async () => {
    spyOn(backendController, "updateUserProperties").and.returnValue(
      Promise.resolve({})
    );
    const localeSelect = await setupLocaleSelect();

    fireEvent.change(localeSelect, { target: { value: "fr" } });
    await wait();

    expect(backendController.updateUserProperties).toHaveBeenCalledWith(
      "uuid",
      {
        defaultLocale: "fr"
      },
      expect.anything()
    );
  });
});

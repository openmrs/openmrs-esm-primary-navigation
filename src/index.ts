import {
  defineConfigSchema,
  getAsyncLifecycle,
  attach
} from "@openmrs/esm-framework";
import { backendDependencies } from "./openmrs-backend-dependencies";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  const moduleName = "@openmrs/esm-primary-navigation-app";

  const options = {
    featureName: "primary navigation",
    moduleName
  };

  defineConfigSchema(moduleName, {});

  return {
    lifecycle: getAsyncLifecycle(() => import("./root.component"), options),
    activate: (location: Location) =>
      !location.pathname.startsWith(window.getOpenmrsSpaBase() + "login"),
    extensions: [
      {
        id: "default-user-panel",
        slot: "user-panel-slot",
        load: getAsyncLifecycle(
          () =>
            import(
              "./components/user-panel-switcher-item/user-panel-switcher.component"
            ),
          options
        )
      },
      {
        id: "change-locale",
        slot: "user-panel-slot",
        load: getAsyncLifecycle(
          () => import("./components/choose-locale/change-locale.component"),
          options
        )
      },
      {
        appName: "@openmrs/esm-primary-navigation",
        name: "nav-options",
        load: getAsyncLifecycle(() => import("./nav-options"), options)
      }
    ]
  };
}
attach("nav-options-slot", "nav-options");

export { backendDependencies, importTranslation, setupOpenMRS };

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
        id: "user-panel-switcher",
        slot: "user-panel-switcher",
        load: getAsyncLifecycle(
          () =>
            import(
              "./components/user-panel-switcher-item/user-panel-switcher.component"
            ),
          options
        )
      }
    ]
  };
}
export { backendDependencies, importTranslation, setupOpenMRS };

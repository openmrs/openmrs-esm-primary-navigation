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

declare global {
  interface Window {
    getOpenmrsSpaBase(): string;
  }
}

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
        appName: "@openmrs/esm-patient-registration",
        name: "add-patient-link",
        load: getAsyncLifecycle(() => import("./add-patient-link"), options)
      }
    ]
  };
}
attach("add-patient-slot", "add-patient-link");
export { backendDependencies, importTranslation, setupOpenMRS };

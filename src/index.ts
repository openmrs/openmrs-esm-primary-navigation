import { defineConfigSchema } from "@openmrs/esm-config";
import { getAsyncLifecycle } from "@openmrs/esm-react-utils";
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
      !location.pathname.startsWith(window.getOpenmrsSpaBase() + "login")
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };

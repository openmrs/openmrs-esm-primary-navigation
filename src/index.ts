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
  return {
    lifecycle: getAsyncLifecycle(() => import("./root.component"), {
      featureName: "primary navigation",
      moduleName: "@openmrs/esm-primary-navigation-app"
    }),
    activate: (location: Location) =>
      !location.pathname.startsWith(window.getOpenmrsSpaBase() + "login")
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };

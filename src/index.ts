import "./set-public-path";
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
    lifecycle: () => import("./openmrs-esm-primary-navigation"),
    activate: (location: Location) =>
      !location.pathname.startsWith(window.getOpenmrsSpaBase() + "login")
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };

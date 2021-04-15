import { defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

const backendDependencies = { 'webservices.rest': '^2.2.0' };

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@openmrs/esm-primary-navigation-app';
const options = {
  featureName: 'primary navigation',
  moduleName,
};

function setupOpenMRS() {
  defineConfigSchema(moduleName, configSchema);

  return {
    lifecycle: getAsyncLifecycle(() => import('./root-online.component'), options),
    activate: (location: Location) => !location.pathname.startsWith(window.getOpenmrsSpaBase() + 'login'),
    extensions: [
      {
        id: 'default-user-panel',
        slot: 'user-panel-slot',
        load: getAsyncLifecycle(
          () => import('./components/user-panel-switcher-item/user-panel-switcher-online.component'),
          options,
        ),
      },
      {
        id: 'change-locale',
        slot: 'user-panel-slot',
        load: getAsyncLifecycle(() => import('./components/choose-locale/change-locale-online.component'), options),
      },
    ],
  };
}

function setupOpenMRSOffline() {
  defineConfigSchema(moduleName, configSchema);

  return {
    lifecycle: getAsyncLifecycle(() => import('./root-offline.component'), options),
    activate: (location: Location) => !location.pathname.startsWith(window.getOpenmrsSpaBase() + 'login'),
    extensions: [
      {
        id: 'default-user-panel',
        slot: 'user-panel-slot',
        load: getAsyncLifecycle(
          () => import('./components/user-panel-switcher-item/user-panel-switcher-offline.component'),
          options,
        ),
      },
      {
        id: 'change-locale',
        slot: 'user-panel-slot',
        load: getAsyncLifecycle(() => import('./components/choose-locale/change-locale-offline.component'), options),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS, setupOpenMRSOffline };

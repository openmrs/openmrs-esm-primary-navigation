import { defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

const backendDependencies = { 'webservices.rest': '^2.2.0' };

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-primary-navigation-app';

  const options = {
    featureName: 'primary navigation',
    moduleName,
  };

  defineConfigSchema(moduleName, configSchema);

  return {
    lifecycle: getAsyncLifecycle(() => import('./root.component'), options),
    activate: (location: Location) => !location.pathname.startsWith(window.getOpenmrsSpaBase() + 'login'),
    extensions: [
      {
        id: 'default-user-panel',
        slot: 'user-panel-slot',
        load: getAsyncLifecycle(
          () => import('./components/user-panel-switcher-item/user-panel-switcher.component'),
          options,
        ),
      },
      {
        id: 'change-locale',
        slot: 'user-panel-slot',
        load: getAsyncLifecycle(() => import('./components/choose-locale/change-locale.component'), options),
      },
    ],
  };
}
export { backendDependencies, importTranslation, setupOpenMRS };

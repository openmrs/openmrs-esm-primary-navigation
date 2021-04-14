import { openmrsObservableFetch } from '@openmrs/esm-framework';

export function getCurrentSession() {
  return openmrsObservableFetch(`/ws/rest/v1/session`);
}

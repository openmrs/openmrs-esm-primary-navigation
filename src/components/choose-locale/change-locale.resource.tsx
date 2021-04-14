import { openmrsFetch } from '@openmrs/esm-framework';

export function updateUserProperties(
  userUuid: string,
  userProperties: any,
  abortController: AbortController,
): Promise<any> {
  return openmrsFetch('/ws/rest/v1/user/' + userUuid, {
    method: 'POST',
    body: {
      userProperties: userProperties,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
  });
}

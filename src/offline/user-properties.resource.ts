import { openmrsFetch, refetchCurrentUser } from '@openmrs/esm-framework';
import { LoggedInUser } from '../types';
import { PrimaryNavigationDb } from './storage';

export type PostUserProperties = (
  userUuid: string,
  userProperties: any,
  abortController?: AbortController,
) => Promise<any>;

export function postUserPropertiesOnline(
  userUuid: string,
  userProperties: any,
  abortController?: AbortController,
): Promise<any> {
  return openmrsFetch(`/ws/rest/v1/user/${userUuid}`, {
    method: 'POST',
    body: { userProperties: userProperties },
    headers: { 'Content-Type': 'application/json' },
    signal: abortController?.signal,
  });
}

export function postUserPropertiesOffline(userUuid: string, userProperties: any): Promise<any> {
  const db = new PrimaryNavigationDb();
  return db.userPropertiesChanges.add({ userUuid, changes: userProperties });
}

export async function syncUserPropertiesChanges(loggedInUser: LoggedInUser, abortController?: AbortController) {
  const db = new PrimaryNavigationDb();
  const queuedChangeEntries = await db.userPropertiesChanges.where({ userUuid: loggedInUser.uuid }).toArray();

  if (queuedChangeEntries.length > 0) {
    const queuedChanges = queuedChangeEntries.map(entry => entry.changes);
    const newUserProperties = Object.assign(loggedInUser.userProperties, ...queuedChanges);
    await postUserPropertiesOnline(loggedInUser.uuid, newUserProperties, abortController);
    refetchCurrentUser();
    await db.userPropertiesChanges.bulkDelete(queuedChangeEntries.map(change => change.id));
  }
}

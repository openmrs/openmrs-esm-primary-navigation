import { openmrsFetch, refetchCurrentUser } from '@openmrs/esm-framework';
import { useLoggedInUser, useNetworkDependent, useOnlineEffect } from './hooks';
import { PrimaryNavigationDb } from './storage';

export type PostUserLocale = (locale: string, abortController?: AbortController) => Promise<any>;

export function usePostUserLocale(): PostUserLocale {
  const user = useLoggedInUser();
  const postOffline: PostUserLocale = (locale, _) => postUserPropertiesOffline(user?.uuid, { defaultLocale: locale });
  const postOnline: PostUserLocale = (locale, abortController) =>
    postUserPropertiesOnline(user?.uuid, { defaultLocale: locale }, abortController).then(() => refetchCurrentUser());

  return useNetworkDependent(postOffline, postOnline);
}

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

export function useLoggedInUserPropertiesSync() {
  const loggedInUser = useLoggedInUser();

  useOnlineEffect(() => {
    async function sync(abortController: AbortController) {
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

    const abortController = new AbortController();
    if (loggedInUser) {
      sync(abortController);
    }

    return () => abortController.abort();
  });
}

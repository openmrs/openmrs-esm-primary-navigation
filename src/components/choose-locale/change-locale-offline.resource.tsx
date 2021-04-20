import { PrimaryNavigationDb } from '../../offline';

export function postUserPropertiesOffline(userUuid: string, userProperties: any): Promise<any> {
  const db = new PrimaryNavigationDb();
  return db.userPropertiesChanges.add({ userUuid, changes: userProperties });
}

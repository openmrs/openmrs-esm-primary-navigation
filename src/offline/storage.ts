import { User } from '@openmrs/esm-framework';
import Dexie, { Table } from 'dexie';

/**
 * Stores offline data of the primary navigation MF.
 */
export class PrimaryNavigationDb extends Dexie {
  userPropertiesChanges: Table<UserPropertiesChange, number>;

  constructor() {
    super('EsmPrimaryNavigation');

    this.version(1).stores({
      userPropertiesChanges: '++id,userUuid',
    });

    this.userPropertiesChanges = this.table('userPropertiesChanges');
  }
}

/**
 * An entity storing a change of a logged in a user's properties.
 */
export interface UserPropertiesChange {
  id?: number;
  userUuid: string;
  changes: Pick<User, 'userProperties'>;
}

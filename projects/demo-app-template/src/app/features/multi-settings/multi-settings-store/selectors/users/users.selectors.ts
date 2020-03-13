import { createSelector } from '@ngrx/store';

import { IMultiSettingsState, selectMultiSettings } from '../../multi-settings.state';
import { IRegularUser } from '../../../models/regular-user.model';

export const selectSettingsUsersState = createSelector(
    selectMultiSettings,
  (state: IMultiSettingsState) => state.users
);

export const selectSettingsUsersLoading = createSelector(
  selectSettingsUsersState, state => state.loading
);

export const selectSettingsUsers = createSelector(
    selectSettingsUsersState,
  state => state.users
);

export const selectSettingsUsersFilter = createSelector(
    selectSettingsUsersState,
  state => state.usersFilter
);

export const selectFilteredUsers = createSelector(
    selectSettingsUsers,
    selectSettingsUsersFilter,
  (items, filter) => {
    if (filter === 'ALL') {
      return items;
    } else {
      const predicate = filter === 'ACTIVE' ? (u:IRegularUser) => u.isActive : (u:IRegularUser) => !u.isActive;
      return items.filter(predicate);
    }
  }
);


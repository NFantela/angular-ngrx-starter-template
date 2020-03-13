import { createSelector } from '@ngrx/store';

import { IAuthModuleState, selectAuthState } from '../auth-state';

export const selectAuthStateLocaly = createSelector(
    selectAuthState,
  (state: IAuthModuleState) => state.auth
);

export const selectIsAuthenticated = createSelector(
    selectAuthStateLocaly, state => state.isAuthenticated
);

export const selectAuthUser = createSelector(
    selectAuthStateLocaly, state => state.authUser
);

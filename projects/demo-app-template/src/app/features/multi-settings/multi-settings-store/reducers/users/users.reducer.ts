import { createReducer, on, Action } from '@ngrx/store';
import * as setUsersActions from '../../actions/users/users.actions';
import { IRegularUser } from '../../../models/regular-user.model';
import { HttpErrorResponse } from '@angular/common/http';

export type SettingsUsersStateFilter = 'ALL' | 'INACTIVE' | 'ACTIVE';

export interface IUsersState {
  users: IRegularUser[];
  usersFilter: SettingsUsersStateFilter,
  loading: boolean;
  error?: HttpErrorResponse
}

export const initialState: IUsersState = {
  users: [],
  usersFilter: 'ALL',
  loading: false
};

const reducer = createReducer(
  initialState,

  on(setUsersActions.actionLoadUsers, (state) => ({
    ...state,
    loading: true
  })),
  on(setUsersActions.actionLoadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users ? [...users] : [],
    loading: false
  })),
  on(setUsersActions.actionDeleteUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.filter((stateUser: IRegularUser) => stateUser.userId !== user.userId),
    loading: false
  })),
  on(
    setUsersActions.actionLoadUsersFail,
    setUsersActions.actionEditUserFail,
    setUsersActions.actionDeleteUserFail, (state, { err }) => ({
      ...state,
      loading: false,
      error: err
    }))

);

export function usersReducer(state: IUsersState | undefined, action: Action) {
  return reducer(state, action);
}

import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
;
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthUser } from '../models/auth-user';


export interface IAuthState {
  isAuthenticated:boolean;
  authUser: IAuthUser |  null,
  loading: boolean;
  error?: HttpErrorResponse
}

export const initialState: IAuthState = {
  isAuthenticated:false,
  authUser: null,
  loading: false
};

const reducer = createReducer(
  initialState,

  on(authActions.actionLogin, (state) => ({
    ...state,
    loading: true
  })),
  on(authActions.actionLoginSucccess, (state, { user }) => ({
    ...state,
    authUser: user ? user : null,
    isAuthenticated:true,
    loading: false
  })),
  on( authActions.actionLoginFail, (state, { err }) => ({
      ...state,
      loading: false,
      error: err
    }))

);

export function authReducer(state: IAuthState | undefined, action: Action) {
  return reducer(state, action);
}

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../core/core-store/core.state';
import { authReducer, IAuthState } from './reducers/auth-reducer';


export const AUTH_FEATURE_NAME = 'auth';
export const selectAuthState = createFeatureSelector<State, IAuthModuleState>(
  AUTH_FEATURE_NAME
);
export const reducers: ActionReducerMap<IAuthModuleState> = {
  auth: authReducer,
};

export interface IAuthModuleState {
  auth:IAuthState
}

export interface State extends AppState {
  [AUTH_FEATURE_NAME]: IAuthModuleState;
}

import { createAction, props } from '@ngrx/store';
import { IAuthUser } from '../models/auth-user';

export const actionLogin = createAction(
    '[Auth] Login User',
    props<{ loginUser: IAuthUser }>()
);

export const registerUser = createAction(
    '[Auth] Login User',
    props<{ loginUser: any }>()
);

export const authLogout = createAction('[Auth] Logout');

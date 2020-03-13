import { createAction, props } from '@ngrx/store';
import { IAuthUser } from '../models/auth-user';

export const actionLogin = createAction(
    '[Auth] Login User',
    props<{ email: string, password:string }>()
);
export const actionLoginSucccess = createAction(
    '[Auth] Login User Success',
    props<{ user:IAuthUser }>()
);
export const actionLoginFail = createAction(
    '[Auth] Login User Fail',
    props<{ err:any }>()
);

export const registerUser = createAction(
    '[Auth] Login User',
    props<{ email: string, password:string, name:string }>()
);

export const authLogout = createAction('[Auth] Logout');

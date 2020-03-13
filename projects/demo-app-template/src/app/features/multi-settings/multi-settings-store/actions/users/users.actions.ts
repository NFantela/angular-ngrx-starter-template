import { createAction, props } from '@ngrx/store';

import { IRegularUser } from '../../../models/regular-user.model';

// example of using custom fn in action 
/**
 *   '[Todos] Add',
        (name: string, id = uuid()) => ({ name, id })
    );
 */

export const actionLoadUsers = createAction(
    '[Multi settings Users] Load Users'
);

export const actionLoadUsersSuccess = createAction(
    '[Multi settings Users] Load Users Success',
    props<{users: IRegularUser[]}>()
);
export const actionLoadUsersFail = createAction(
    '[Multi settings Users] Load Users Fail',
    props<{err: any}>()
);
// edit
export const actionEditUser = createAction(
    '[Multi settings Users] Edit User Success',
    props<{user: IRegularUser}>()
);
export const actionEditUserSuccess = createAction(
    '[Multi settings Users] Edit User Success',
        props<{user: IRegularUser}>()
);

export const actionEditUserFail = createAction(
    '[Multi settings Users] Edit User Fail',
    props<{err: any}>()
);
// delete
export const actionDeleteUser = createAction(
    '[Multi settings Users] Delete User Success',
    props<{user: IRegularUser}>()
);
export const actionDeleteUserSuccess = createAction(
    '[Multi settings Users] Delete User Success',
    props<{user: IRegularUser}>()
);

export const actionDeleteUserFail = createAction(
    '[Multi settings Users] Delete User Fail',
    props<{err: any}>()
);
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions,  ofType, createEffect } from '@ngrx/effects';
import { debounceTime, switchMap, map, catchError, concatMap, tap } from 'rxjs/operators';



import { MultiSettingsState } from '../../multi-settings.state';
import * as usersAction from '../../actions/users/users.actions';
import { UsersService } from '../../../services/users/users.service';
import { of } from 'rxjs';
import { NotificationService } from 'projects/demo-app-template/src/app/core/services/notification-service/notification.service';


@Injectable()
export class MultiSettingsUsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<MultiSettingsState>,
    private _usersService:UsersService,
    private _nofiricationsService:NotificationService
  ) {}

  getUsers$ = createEffect(() => ({ debounce = 900 } = {}) =>
    this.actions$.pipe(
      ofType(usersAction.actionLoadUsers),
      debounceTime(debounce),
      switchMap(action =>
        this._usersService.getUsersFromDb().pipe(
          map(users => usersAction.actionLoadUsersSuccess({ users })),
          catchError(err => of(usersAction.actionLoadUsersFail({ err })))
        )
      )
    )
  );



  usersSuccessMsg$ = createEffect(() => 
      this.actions$.pipe(
        ofType( usersAction.actionEditUserSuccess,  usersAction.actionDeleteUserSuccess),
        tap(action => {
          const userName = action && action.user && action.user.name;
          const actionType = action && action.type === usersAction.actionEditUserSuccess.type ? 'Edited' : 'Deleted';
          return this._nofiricationsService.success(`User : ${userName ? userName : 'No name'} ${actionType}`);
        })
      ), 
      { dispatch: false });
}

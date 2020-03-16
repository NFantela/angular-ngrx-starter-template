import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap, switchMap, map, catchError, filter } from 'rxjs/operators';


import { actionLogin, actionLoginFail, actionLoginSucccess, authLogout } from '../actions/auth.actions';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { AuthService } from '../../services/auth.service';
import { IAuthUser, ILocalStorageAuth } from '../models/auth-user';
import { of } from 'rxjs';

export const AUTH_KEY = 'AUTH';
const AUTH_INIT = of('auth-init-trigger');

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _authService:AuthService
  ) {}

  loginUser$ = createEffect(() => 
    this._actions$.pipe(
        ofType(actionLogin),
        switchMap(({email, password}) => {
            return this._authService.loginUser(email, password).pipe(
                map((user:IAuthUser) => actionLoginSucccess({ user })),
                catchError(err => of(actionLoginFail({ err })))                
            )
        })
    )
  );
  /** Initiate a stream that will log in user if any exist in local storage */
  localLoginUserOnInit$ = createEffect(() => 
    AUTH_INIT.pipe(
      switchMap(() => {
         const userInLocalService:ILocalStorageAuth  = this._localStorageService.getItem(AUTH_KEY);
         return of(userInLocalService);       
      }),
      filter(val => !!(val && val.user)),
      map(({user})=> actionLoginSucccess({user : user}))  
    )  
  );

  loginListener$ = createEffect(() =>
      this._actions$.pipe(
        ofType(actionLoginSucccess),
        tap(({user}) =>
          this._localStorageService.setItem(AUTH_KEY, { isAuthenticated: true, user })
        )
      ),
    { dispatch: false }
  );



  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this._router.navigate(['']);
          this._localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false, user:null
          });
        })
      ),
    { dispatch: false }
  );
}

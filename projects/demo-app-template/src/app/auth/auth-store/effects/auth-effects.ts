import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap, switchMap, map, catchError } from 'rxjs/operators';


import { actionLogin, actionLoginFail, actionLoginSucccess, authLogout } from '../actions/auth.actions';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { AuthService } from '../../services/auth.service';
import { IAuthUser } from '../models/auth-user';
import { of } from 'rxjs';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router,
    private _authService:AuthService
  ) {}

  loginUser$ = createEffect(() => 
    this.actions$.pipe(
        ofType(actionLogin),
        switchMap(({email, password}) => {
            return this._authService.loginUser(email, password).pipe(
                map((user:IAuthUser) => actionLoginSucccess({ user })),
                catchError(err => of(actionLoginFail({ err })))                
            )
        })
    )
  );

  loginListener$ = createEffect(() =>
      this.actions$.pipe(
        ofType(actionLoginSucccess),
        tap(({user}) =>
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true, user })
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogout),
        tap(() => {
          this.router.navigate(['']);
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false, user:null
          });
        })
      ),
    { dispatch: false }
  );
}

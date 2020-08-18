import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from '../auth-store/selectors/auth-selectors';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthState } from '../auth-store/auth-state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _store: Store<AuthState>,
    private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._store.pipe(
      select(selectIsAuthenticated),
      tap(isAuth => {
        if(!isAuth){
          console.log(isAuth, "guard")
          this._router.navigate([`/${environment.navRoutes.auth}`])
        }
      })
    );
  }

  
}

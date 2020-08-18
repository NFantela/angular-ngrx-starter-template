import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actionSettingsChangeTheme } from 'projects/demo-app-template/src/app/core/core-store/actions/settings/settings.actions';
import { actionLogin, actionLogout } from 'projects/demo-app-template/src/app/auth/auth-store/actions/auth.actions';
import { Observable, EMPTY } from 'rxjs';
import { selectIsAuthenticated } from 'projects/demo-app-template/src/app/auth/auth-store/selectors/auth-selectors';
import { AuthState } from '@demo-app/auth/auth-store/auth-state';

@Component({
  selector: 'my-demo-prefix-home',
  templateUrl: 'home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AuthState>) { }

  themes:string[] = ['LIGHT-THEME', 'DARK-THEME'];
  loggedIn$:Observable<boolean> = EMPTY;

  ngOnInit(): void {
    this.loggedIn$ = this.store.pipe(select(selectIsAuthenticated));
  }

  onThemeSelect(theme:string) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }

  logInOutUser(logIn:boolean){
    if(logIn){
      this.store.dispatch(actionLogin({email:"nfantela@gmail.com", password: "asdasdx"}))
    } else {
      this.store.dispatch(actionLogout())
    }
  }

}

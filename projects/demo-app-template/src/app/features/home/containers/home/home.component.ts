import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'projects/demo-app-template/src/app/core/core-store/core.state';
import { actionSettingsChangeTheme } from 'projects/demo-app-template/src/app/core/core-store/actions/settings/settings.actions';
import { actionLogin } from 'projects/demo-app-template/src/app/auth/auth-store/actions/auth.actions';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from 'projects/demo-app-template/src/app/auth/auth-store/selectors/auth-selectors';

@Component({
  selector: 'my-demo-prefix-home',
  templateUrl: 'home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  themes:string[] = ['LIGHT-THEME', 'DARK-THEME'];
  loggedIn$:Observable<boolean>;

  ngOnInit(): void {
    this.loggedIn$ = this.store.pipe(select(selectIsAuthenticated));
  }

  onThemeSelect(theme:string) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }

  logInUser(){
    this.store.dispatch(actionLogin({email:"nfantela@gmail.com", password: "asdasdx"}))
  }

}

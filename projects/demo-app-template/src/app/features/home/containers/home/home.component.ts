import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'projects/demo-app-template/src/app/core/core-store/core.state';
import { actionSettingsChangeTheme } from 'projects/demo-app-template/src/app/core/core-store/actions/settings/settings.actions';

@Component({
  selector: 'my-demo-prefix-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  themes:string[] = ['LIGHT-THEME', 'DARK-THEME'];

  ngOnInit(): void {
  }

  onThemeSelect(theme:string) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }

}

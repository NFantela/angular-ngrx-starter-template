import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  filter
} from 'rxjs/operators';

import { AppState, selectSettingsState } from '../../core.state';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { TitleService } from '../../../services/title/title.service';
import { AnimationsService } from '../../../services/animations/animations.service';
import { actionSettingsChangeAnimationsElements, actionSettingsChangeAnimationsPage, 
  actionSettingsChangeAnimationsPageDisabled, actionSettingsChangeAutoNightMode, actionSettingsChangeLanguage, 
  actionSettingsChangeStickyHeader, actionSettingsChangeTheme } from '../../actions/settings/settings.actions';
import { selectPageAnimations, selectElementsAnimations, selectEffectiveTheme, selectSettingsLanguage } from '../../selectors/settings.selectors';


export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('starter-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private router: Router,
    private _overlayContainer: OverlayContainer,
    private _localStorageService: LocalStorageService,
    private _titleService: TitleService,
    private _animationsService: AnimationsService,
   // private ngZone: NgZone
  ) {}

  // hour = 0;
  // changeHour = this.ngZone.runOutsideAngular(() =>
  //   setInterval(() => {
  //     const hour = new Date().getHours();
  //     if (hour !== this.hour) {
  //       this.hour = hour;
  //       this.ngZone.run(() =>
  //         this.store.dispatch(actionSettingsChangeHour({ hour }))
  //       );
  //     }
  //   }, 60_000)
  // );

  persistSettingsToLocalStorage$ = createEffect(() =>
      this._actions$.pipe(
        ofType(
          actionSettingsChangeAnimationsElements,
          actionSettingsChangeAnimationsPage,
          actionSettingsChangeAnimationsPageDisabled,
          actionSettingsChangeAutoNightMode,
          actionSettingsChangeLanguage,
          actionSettingsChangeStickyHeader,
          actionSettingsChangeTheme
        ),
        withLatestFrom(this._store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this._localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );

  updateRouteAnimationType$ = createEffect(() =>
      merge( INIT, this._actions$.pipe(
          ofType(
            actionSettingsChangeAnimationsElements,
            actionSettingsChangeAnimationsPage
          )
        )
      ).pipe(
        withLatestFrom(
          combineLatest([
            this._store.pipe(select(selectPageAnimations)),
            this._store.pipe(select(selectElementsAnimations))
          ])
        ),
        tap(([action, [pageAnimations, elementsAnimations]]) =>
          this._animationsService.updateRouteAnimationType(
            pageAnimations,
            elementsAnimations
          )
        )
      ),
    { dispatch: false }
  );

  /** Updates Material overlay element classes */
  updateTheme$ = createEffect(() =>
      merge(INIT, this._actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
        withLatestFrom(this._store.pipe(select(selectEffectiveTheme))),
        tap(([action, effectiveTheme]) => {
          const classList = this._overlayContainer.getContainerElement()
            .classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(effectiveTheme);
        })
      ),
    { dispatch: false }
  );


  setTitle$ = createEffect(() =>
      merge(
        this._actions$.pipe(ofType(actionSettingsChangeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this._titleService.setTitle(
            this.router.routerState.snapshot.root,
          );
        })
      ),
    { dispatch: false }
  );
}

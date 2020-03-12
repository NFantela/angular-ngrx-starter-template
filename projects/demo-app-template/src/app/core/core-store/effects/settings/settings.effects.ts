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
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
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
      this.actions$.pipe(
        ofType(
          actionSettingsChangeAnimationsElements,
          actionSettingsChangeAnimationsPage,
          actionSettingsChangeAnimationsPageDisabled,
          actionSettingsChangeAutoNightMode,
          actionSettingsChangeLanguage,
          actionSettingsChangeStickyHeader,
          actionSettingsChangeTheme
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) =>
          this.localStorageService.setItem(SETTINGS_KEY, settings)
        )
      ),
    { dispatch: false }
  );

  updateRouteAnimationType$ = createEffect(() =>
      merge( INIT, this.actions$.pipe(
          ofType(
            actionSettingsChangeAnimationsElements,
            actionSettingsChangeAnimationsPage
          )
        )
      ).pipe(
        withLatestFrom(
          combineLatest([
            this.store.pipe(select(selectPageAnimations)),
            this.store.pipe(select(selectElementsAnimations))
          ])
        ),
        tap(([action, [pageAnimations, elementsAnimations]]) =>
          this.animationsService.updateRouteAnimationType(
            pageAnimations,
            elementsAnimations
          )
        )
      ),
    { dispatch: false }
  );

  /** Updates Material overlay element classes */
  updateTheme$ = createEffect(() =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(([action, effectiveTheme]) => {
          const classList = this.overlayContainer.getContainerElement()
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
        this.actions$.pipe(ofType(actionSettingsChangeLanguage)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
      ).pipe(
        tap(() => {
          this.titleService.setTitle(
            this.router.routerState.snapshot.root,
          );
        })
      ),
    { dispatch: false }
  );
}

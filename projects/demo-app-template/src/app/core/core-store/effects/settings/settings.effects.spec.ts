import * as assert from 'assert';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { NgZone } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { TitleService } from '../../../services/title/title.service';
import { AnimationsService } from '../../../services/animations/animations.service';
import { AppState } from '../../core.state';
import { SettingsState } from '../../reducers/settings/settings.reducer';
import { actionSettingsChangeTheme } from '../../actions/settings/settings.actions';
import { SettingsEffects, SETTINGS_KEY } from './settings.effects';



const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('SettingsEffects', () => {
  let router: any;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let overlayContainer: jasmine.SpyObj<OverlayContainer>;
  let titleService: jasmine.SpyObj<TitleService>;
  let animationsService: jasmine.SpyObj<AnimationsService>;
  let store: jasmine.SpyObj<Store<AppState>>;
  let ngZone: jasmine.SpyObj<NgZone>;

  beforeEach(() => {
    router = {
      routerState: {
        snapshot: {}
      },
      events: {
        pipe() {}
      }
    };
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem'
    ]);
    overlayContainer = jasmine.createSpyObj('OverlayContainer', [
      'getContainerElement'
    ]);
    titleService = jasmine.createSpyObj('TitleService', ['setTitle']);
    animationsService = jasmine.createSpyObj('AnimationsService', [
      'updateRouteAnimationType'
    ]);
    store = jasmine.createSpyObj('store', ['pipe']);
    ngZone = jasmine.createSpyObj('mockNgZone', ['run', 'runOutsideAngular']);
    ngZone.run.and.callFake(fn => fn());
  });

  it('should call methods on LocalStorageService for PERSIST action', () => {
    scheduler.run(helpers => {
      const { cold } = helpers;

      const settings: SettingsState = {
        language: 'en',
        pageAnimations: true,
        elementsAnimations: true,
        theme: 'default',
        nightTheme: 'default',
        autoNightMode: false,
        pageAnimationsDisabled: true,
        hour: 12
      };
      store.pipe.and.returnValue(of(settings));
      const persistAction = actionSettingsChangeTheme({ theme: 'DEFAULT' });
      const source = cold('a', { a: persistAction });
      const actions = new Actions(source);
      const effect = new SettingsEffects(
        actions,
        store,
        router,
        overlayContainer,
        localStorageService,
        titleService,
        animationsService
      );

      effect.persistSettingsToLocalStorage$.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(
          SETTINGS_KEY,
          settings
        );
      });
    });
  });
});

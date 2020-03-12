import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { initStateFromLocalStorage } from './reducers/meta-reducers/init-state-from-local-storage.reducer';
import { RouterStateUrl } from '../router-store/router.state';
import { SettingsState, settingsReducer } from './reducers/settings/settings.reducer';


export const reducers: ActionReducerMap<AppState> = {
    settings: settingsReducer,
    router: routerReducer
};
// to be used in core module as metaReducers
export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

// if (!environment.production) {
//     if (!environment.test) {
//         metaReducers.unshift(debug);
//     }
// }

// export const selectAuthState = createFeatureSelector<AppState, AuthState>(
//     'auth'
// );

export const selectSettingsState = createFeatureSelector<
    AppState,
    SettingsState
>('settings');

export const selectRouterState = createFeatureSelector<
    AppState,
    RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
    settings: SettingsState;
    router: RouterReducerState<RouterStateUrl>;
}
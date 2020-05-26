
import { Action, createReducer, on } from '@ngrx/store';
import { actionSettingsChangeLanguage, actionSettingsChangeTheme, 
  actionSettingsChangeAutoNightMode, actionSettingsChangeStickyHeader, 
  actionSettingsChangeAnimationsPage, actionSettingsChangeAnimationsElements, 
  actionSettingsChangeHour, actionSettingsChangeAnimationsPageDisabled } from '../../actions/settings/settings.actions';
import { NIGHT_MODE_THEME, THEME_NAME } from '../../../models/settings.model';

export interface SettingsState {
  language: string;
  theme: string; // LIGHT-THEME || DARK-THEME
  autoNightMode: boolean;
  nightTheme: string;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
  hour: number;
}

export const initialState: SettingsState = {
  language: 'en',
  theme: THEME_NAME.LIGHT,
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  hour: 0
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
    actionSettingsChangeAutoNightMode,
    actionSettingsChangeStickyHeader,
    actionSettingsChangeAnimationsPage,
    actionSettingsChangeAnimationsElements,
    actionSettingsChangeHour,
    (state, action) => ({ ...state, ...action })
  ),
  on(
    actionSettingsChangeAnimationsPageDisabled,
    (state, { pageAnimationsDisabled }) => ({
      ...state,
      pageAnimationsDisabled,
      pageAnimations: false
    })
  )
);

export function settingsReducer( state: SettingsState | undefined, action: Action ) {
  return reducer(state, action);
}

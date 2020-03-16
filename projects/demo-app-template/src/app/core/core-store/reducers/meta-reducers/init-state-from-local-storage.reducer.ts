import { ActionReducer, INIT } from '@ngrx/store';

import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { AppState } from '../../core.state';

export function initStateFromLocalStorage( reducer: ActionReducer<AppState> ): ActionReducer<AppState> {

  return function(state, action) {

    const newState = reducer(state, action);
    // creates arr of 2 strings INIT and UPDATE and checks if action is one of those 2
    // if so loads initial state via static method of LocalStorageService
    if ([INIT.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }

    return newState;
  };

}

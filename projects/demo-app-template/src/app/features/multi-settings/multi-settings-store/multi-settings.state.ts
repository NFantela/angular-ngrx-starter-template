import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../../core/core-store/core.state';
import { usersReducer, IUsersState } from './reducers/users/users.reducer';


export const FEATURE_NAME = 'multi-settings';
export const selectMultiSettings = createFeatureSelector<MultiSettingsState, IMultiSettingsState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<IMultiSettingsState> = {
  users: usersReducer,
    // other props with reducers if any
    // todos: todosReducer,
    // stocks: stockMarketReducer,
    // books: bookReducer,
    // form: formReducer
};

export interface IMultiSettingsState {
//   todos: TodosState;
//   stocks: StockMarketState;
//   form: FormState;
//   books: BookState;
  users:IUsersState
}

export interface MultiSettingsState extends AppState {
  [FEATURE_NAME]: IMultiSettingsState;
}

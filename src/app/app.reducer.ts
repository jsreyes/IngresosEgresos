


import * as fromUI from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

// Interface de UI
export interface AppState {
  ui: fromUI.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer
}

import { createSelector } from 'reselect';
import { initialState } from 'reducers/app';

const selectApp = state => state.app || initialState;
const loadingSelector = createSelector(selectApp, appState => appState.loading);

export { loadingSelector };

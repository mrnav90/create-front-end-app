import { createSelector } from 'reselect';
import { initialState } from 'reducers/translation';

const selectLanguage = state => state.i18n || initialState;
const languageSelector = createSelector(
  selectLanguage,
  languageState => languageState.locale,
);

export { languageSelector };

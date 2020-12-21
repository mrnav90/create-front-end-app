import { ActionTypes } from 'configs/constants';
import { action } from 'typesafe-actions';

export const changeLanguage = locale =>
  action(ActionTypes.CHANGE_LANGUAGE, { locale });

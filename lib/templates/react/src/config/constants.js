import langEn from 'i18n/en.json';
import langJa from 'i18n/ja.json';
import { isIE } from 'utils';
import * as ActionTypes from './action-types';

export const I18N_DATA = {
  en: langEn,
  ja: langJa,
};

export const DEFAULT_LANGUAGE = 'ja';
export const REQUEST_HEADER = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// eslint-disable no-useless-escape
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const REGEX_URL = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;


export const GOOGLE_WEB_FONT = {
  google: {
    families: ['Noto Sans JP:400,700'],
  },
  active: () => {
    sessionStorage.fonts = true;
  },
};

export const GOOGLE_WEB_FONT_STATUS = {
  inactive: 'inactive',
  active: 'active',
  loading: 'loading',
};

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export { ActionTypes };

export const KEY_CODES = {
  comma: 188,
  enter: 13,
  space: 32,
};

export const DATE_FORMAT = {
  all: isIE() ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY-MM-DD HH:mm:ss',
  dateTime: isIE() ? 'YYYY/MM/DD HH:mm' : 'YYYY-MM-DD HH:mm',
};

export { default as RESOURCES } from './resources';

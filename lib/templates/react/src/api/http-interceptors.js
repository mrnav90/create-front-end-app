import axios from 'axios';
import {
  isAuthenticated,
  getAccessToken,
  getLanguage,
  revokeUser,
  getWorkspaceURI,
  windowRedirect,
  notification,
} from 'utils';
import { REQUEST_HEADER, DEFAULT_LANGUAGE } from 'configs/constants';

const workspaceURL = getWorkspaceURI();

axios.interceptors.request.use(
  config => {
    const newConfig = config;
    if (isAuthenticated()) {
      newConfig.headers.Authorization = `Bearer ${getAccessToken()}`;
    }

    newConfig.headers.Language = getLanguage()
      ? getLanguage()
      : DEFAULT_LANGUAGE;
    Object.assign(config.headers, REQUEST_HEADER);
    return newConfig;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => response.data,
  error => {
    const statusCode = error.response.status;
    switch (statusCode) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        break;
    }
    return Promise.reject(error.response && error.response.data);
  },
);

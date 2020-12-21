import axios from 'axios';
import reduxAPI from 'redux-api';
import platform from './platform';
import chat from './chat';
import webinar from './webinar';
import webinarSubscriber from './webinar-subscriber';
import './http-interceptors';

const wrapRequestAPI = (request, rootUrl) => {
  let url = rootUrl || API_URL;
  if (typeof window !== 'undefined' && window.location.origin !== APP_URL) {
    const parseUrl = /^(http(s)?:\/\/)?(.+)$/i.exec(url);
    const workSpaceName = window.location.hostname.split('.').shift();
    url = `${parseUrl[1]}${workSpaceName}.${parseUrl[3]}`;
  }

  return reduxAPI(request)
    .use('fetch', axios)
    .use('rootUrl', url);
};

const platformRequest = wrapRequestAPI(platform);
const chatRequest = wrapRequestAPI(chat, API_CHAT_URL);
const webinarRequest = wrapRequestAPI(webinar);
const webinarSubscriberRequest = wrapRequestAPI(webinarSubscriber);

export {
  platformRequest,
  chatRequest,
  webinarRequest,
  webinarSubscriberRequest,
};

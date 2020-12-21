import { ActionTypes } from 'configs/constants';
import { action } from 'typesafe-actions';

export const connectWebSocket = channel =>
  action(ActionTypes.CONNECT_WEBSOCKET, { channel });

export const sendEventMessage = (event, data) =>
  action(ActionTypes.SEND_EVENT_MESSAGE, { event, data });

export const handleReceiveEventMessage = data =>
  action(ActionTypes.RECEIVE_EVENT_MESSAGE, data);

import { put } from 'redux-saga/effects';
import {
  handleReceiveEventMessage,
} from 'actions';

export function* event_message(data) {
  yield put(handleReceiveEventMessage(data));
}

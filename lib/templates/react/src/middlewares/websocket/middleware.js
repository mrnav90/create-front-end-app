import { eventChannel } from 'redux-saga';
import { call, fork, take, apply } from 'redux-saga/effects';
import { ActionTypes } from 'config/constants';
import Socket from './socket';
import * as handlers from './handlers';

function createSocket(channel) {
  const socket = new Socket();
  socket.subscribeChannel(channel);
  return socket;
}

function createSocketChannel(socket) {
  return eventChannel(emit => {
    socket.privateChannel.on('message', data => {
      emit({ event: 'message', data });
    });
    const unsubscribe = () => {
      socket.disconnect();
    };

    return unsubscribe;
  });
}

function* sendEventMessage(socket) {
  while (true) {
    const { payload } = yield take(ActionTypes.SEND_EVENT_MESSAGE);
    yield apply(socket, socket.emit, ['message', payload.data]);
  }
}

function* receiveEventSocket(socketChannel) {
  while (true) {
    const payload = yield take(socketChannel);
    const noop = () => null;
    const handle = handlers[`event_${payload.event}`] || noop;
    yield fork(handle, payload.data);
  }
}

export default function* workerSocket() {
  const { payload } = yield take(ActionTypes.CONNECT_WEBSOCKET);
  const socket = yield call(createSocket, payload.channel);
  const socketChannel = yield call(createSocketChannel, socket);
  yield fork(receiveEventSocket, socketChannel);
  yield fork(sendEventMessage, socket);
}

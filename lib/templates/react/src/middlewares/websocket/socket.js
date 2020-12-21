import WebSocket from 'adonis-websocket-client';
import { isAuthenticated, getAccessToken } from 'utils';

export default class WebsocketConnection {
  constructor() {
    if (isAuthenticated()) {
      this.socketClient = WebSocket(SOCKET_URL, {
        transports: ['websocket', 'polling', 'flashsocket'],
      });
      this.privateChannel = null;
    }
  }

  subscribeChannel(channel) {
    if (this.socketClient) {
      this.privateChannel = this.socketClient
        .channel(channel)
        .withJwt(getAccessToken())
        .connect();

      this.privateChannel.on('connect', () => {
        // channel ready
      });

      this.privateChannel.on('disconnect', () => {
        // channel disconnected
      });

      this.privateChannel.on('reconnect', () => {
        // channel disconnected
      });

      this.privateChannel.on('error', error => {
        console.error('Connect channel error', error);
      });
    }
  }

  emit(event, data) {
    if (this.socketClient && this.privateChannel) {
      this.privateChannel.emit(event, data);
    }
  }

  disconnect() {
    if (this.socketClient && this.privateChannel) {
      this.privateChannel.close();
    }
  }
}

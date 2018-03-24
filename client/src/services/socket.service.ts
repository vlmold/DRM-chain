import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;
  constructor() {
    // this.socket = io(this.url);

  }
  sendMessage(message) {
    this.socket.emit('news', message).then((res) => {
      console.log(res);
    });
  }
  getMessages(): Observable<any> {
    if (this.socket.disconnected) {
      this.socket.connect();
    }
    let observable = new Observable(observer => {
      let onEvent = JSON.stringify({ Action: "Status" });
      this.socket.on(onEvent, (data) => {
        observer.next(data);
      })
    });

    return observable as Observable<any>;
  }
  disconnect() {
    this.socket.disconnect();
  }
}

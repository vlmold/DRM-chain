import { Component, ViewChild } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Observable<any>;
  title = 'app';
  status = 0;
  started : boolean = false;
  /**
   *
   */
  constructor(private socketService: SocketService, private authService: AuthService) {
    this.subscribeOnMessages();
  }
  
  play() {

  }
  @ViewChild('videoPlayer') videoplayer: any;

  toggleVideo(event: any) {
      this.videoplayer.nativeElement.play();
  }
  subscribeOnMessages() {
    this.subscription = this.socketService.getMessages();
    this.subscription.subscribe((res) => {
      console.log(res);
      this.started = false;
    })
  }

}

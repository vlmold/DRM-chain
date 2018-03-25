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
  status = -1;
  started: boolean = false;
  stoped: boolean = true;
  /**
   *
   */
  constructor(private socketService: SocketService, private authService: AuthService) {
    this.subscribeOnMessages();
  }

  play() {

  }
  @ViewChild('videoPlayer') videoplayer: any;

  startVideo(event: any) {
    this.started = true;
    this.authService.play().subscribe((res) => {
      console.log(res);
    })
  }
  stopVideo(event: any) {

    this.videoplayer.nativeElement.pause();
    this.stoped = false;

this.status = -1;    
    this.started = false;
  }
  subscribeOnMessages() {
    this.subscription = this.socketService.getMessages();
    this.subscription.subscribe((res) => {
      console.log(res); 
      this.status = res.status;
      if (this.status === 4) {
        this.videoplayer.nativeElement.play();
      }
    })
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

declare var shaka:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
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
 ngOnInit(){
    console.log('init');
   this.initApp();

 }

  manifestUri = '//storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd';

   initApp() {

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

   initPlayer() {
     //debugger;
    // Create a Player instance.
    var video = this.videoplayer.nativeElement;
    var player = new shaka.Player(video);


    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    let self = this;
    // Try to load a manifest.
    // This is an asynchronous process.
    player.load(this.manifestUri).then(function() {
      // self.videoplayer.nativeElement.pause();
      // self.stoped = false;
      //
      // self.status = -1;
      // self.started = false;
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
    }).catch(this.onError);  // onError is executed if the asynchronous load fails.
  }

   onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

   onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
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

    var video = this.videoplayer.nativeElement;
    var player = new shaka.Player(video);

    player.unload();
    //this.initPlayer();
  }
  subscribeOnMessages() {
    this.subscription = this.socketService.getMessages();
    this.subscription.subscribe((res) => {
      console.log(res);
      this.status = res.status;
      if (this.status === 4) {
        this.initPlayer();
        //this.videoplayer.nativeElement.play();
      }
    })
  }

}

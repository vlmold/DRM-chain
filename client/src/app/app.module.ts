import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { Http, HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [SocketService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

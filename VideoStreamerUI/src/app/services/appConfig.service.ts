import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor() { }

  // public loadAppConfig(): Promise<string | void> {
  //   // return this.httpClient.get('/assets/config.json')
  //   //   .toPromise()
  //   //   .then(data => {
  //   //     this.appConfig = data;
  //   // });
  // }

  public get webSocketsServerUrl(): string {
    // if (!this.appConfig) {
    //   throw Error('Config file not loaded!');
    // }


    // return "ws://echo.websocket.org";
    return "wss://localhost:44343/movies";
  }
}

import { Injectable } from "@angular/core";
import { List } from 'immutable';

import { WebRTCClient } from './webrtc-client.model';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable()
export class WebRTCClientStore {
  private _clients: BehaviorSubject<List<WebRTCClient>> = new BehaviorSubject(List([]));

  constructor() { }

  public get clients$(): Observable<List<WebRTCClient>> {
    return this._clients.asObservable();
  }

  public tryAddClient(newClient: WebRTCClient): boolean {
    if (this._clients.getValue().find(x => x.id === newClient.id)) {
      return false;
    }

    this._clients.next(this._clients.getValue().push(newClient));
    return true
  }

  public removeClient(clientId: string): void {
    let clientList = this._clients.getValue();
    const removeIndex = clientList.findIndex(c => c.id === clientId);
    this._clients.next(clientList.remove(removeIndex));
  }
}
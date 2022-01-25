import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  public startConnection = (socketConnection: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(socketConnection)
      .build();

    this.connect();
  }

  public addTransferChartDataListener = (
    eventHubConnection: string,
    callBackEvent: any = null
  ) => {
    this.hubConnection.on(eventHubConnection, (data) => {
      if (data && callBackEvent) {
        callBackEvent(data);
      }
    });
  }

  private connect() {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public disconnect() {
    this.hubConnection
      .stop()
      .then(() => console.log('Connection Stop'))
      .catch((err) => console.log('Error while stop connection: ' + err));
  }
}

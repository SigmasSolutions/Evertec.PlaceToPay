import { Component, OnInit } from '@angular/core';
import { MessageAlert } from 'src/app/app-core/core/objects/massage.alert.object';
import { MessageAlertService } from 'src/app/app-core/core/services/message.alert.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  objMensaje: MessageAlert;

  constructor(readonly messageAlertService: MessageAlertService) { }

  ngOnInit() {
    this.messageAlertService.getMessageAlert()
      .subscribe(messageAlert => {
        this.objMensaje = messageAlert;
      });
  }
}

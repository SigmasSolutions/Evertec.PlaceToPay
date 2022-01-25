import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageAlert } from '@appcore/objects/massage.alert.object';

@Injectable({
    providedIn: 'root'
})
export class MessageAlertService {

    readonly messageAlert: BehaviorSubject<MessageAlert> = new BehaviorSubject<MessageAlert>(null);

    constructor() { }

    showMessageAlert(messageAlert: MessageAlert) {
        this.messageAlert.next(messageAlert);
    }

    hideMessageAlert() {
        this.messageAlert.next(null);
    }

    getMessageAlert() {
        return this.messageAlert;
    }
}

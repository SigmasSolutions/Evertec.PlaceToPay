import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(
    private readonly updates: SwUpdate,
    private readonly messageService: MessageService
  ) {
    updates.available.subscribe(() => {
      this.showAppUpdateAlert();
    });

    updates.activated.subscribe(() => {
      this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    this.messageService.openConfirm(
      {
        text: 'GeneralConfirmUpdateApp',
        title: 'GeneralConfirmUpdateApp',
        cancelButton: 'NoActualizar',
        confirmButton: 'Aceptar',
      },
      '',
      () => {
        this.doAppUpdate(this.updates);
      },
      true
    );
  }

  doAppUpdate(updates: SwUpdate) {
    updates.activateUpdate().then(() => document.location.reload());
  }
}

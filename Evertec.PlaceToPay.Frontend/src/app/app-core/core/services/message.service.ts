import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Message } from '@appcore/objects/message.object';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Utility } from '@appcore/utility';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(readonly translate: TranslateService) {}

  showMessage(message: Message): void {
    message.typeMessage = message.typeMessage || 'success';
    this.translate
      .get(
        [
          `Messages.${message.typeMessage}.${message.text}`,
          `Messages.${message.typeMessage}.Title.${message.title}`,
          `Generic.Buttons.${message.confirmButton}`,
        ],
        { param: message.tags }
      )
      .subscribe((res: any) => {
        Swal.fire({
          title:
            message.title && message.title !== ''
              ? res[`Messages.${message.typeMessage}.Title.${message.title}`]
              : '',
          html: `${res[`Messages.${message.typeMessage}.${message.text}`]} ${
            message.details || ''
          }`,
          icon: message.typeMessage,
          showConfirmButton:
            message.confirmButton && message.confirmButton !== '',
          confirmButtonText:
            message.confirmButton && message.confirmButton !== ''
              ? res[`Generic.Buttons.${message.confirmButton}`]
              : '',
          confirmButtonColor:
            Utility.DEFAULT_CONFIG_APP.DefaultConfirmButtonColor,
          timer:
            message.confirmButton && message.confirmButton !== ''
              ? undefined
              : Utility.DEFAULT_CONFIG_APP.DefaultTimerMessage,
          timerProgressBar: !(
            message.confirmButton && message.confirmButton !== ''
          ),

          onOpen: (objmessage) => {
            objmessage.addEventListener('mouseenter', Swal.stopTimer);
            objmessage.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
      });
  }

  showToast(message: Message): void {
    message.typeMessage = message.typeMessage || 'success';
    this.translate
      .get(`Messages.${message.typeMessage}.${message.text}`, {
        param: message.tags,
      })
      .subscribe((res: string) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: Utility.DEFAULT_CONFIG_APP.DefaultTimerToast,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: message.typeMessage,
          title: res,
        });
      });
  }

  openConfirm(
    message: Message,
    param: any,
    callback: any,
    isQuestion = false
  ): void {
    this.translate
      .get(
        [
          `Messages.${message.text}`,
          `Messages.Title.${message.title}`,
          `Generic.Buttons.${message.confirmButton}`,
          `Generic.Buttons.${message.cancelButton}`,
        ],
        { param }
      )
      .subscribe((res: any) => {
        Swal.fire({
          title:
            message.title && message.title !== ''
              ? res[`Messages.Title.${message.title}`]
              : '',
          html: `${res[`Messages.${message.text}`]} ${message.details || ''}`,
          icon: isQuestion ? 'question' : 'warning',

          confirmButtonColor:
            Utility.DEFAULT_CONFIG_APP.DefaultConfirmButtonColor,
          showConfirmButton:
            message.confirmButton && message.confirmButton !== '',
          confirmButtonText:
            message.confirmButton && message.confirmButton !== ''
              ? res[`Generic.Buttons.${message.confirmButton}`]
              : '',
          cancelButtonColor:
            Utility.DEFAULT_CONFIG_APP.DefaultCancelButtonColor,
          showCancelButton: message.cancelButton && message.cancelButton !== '',
          cancelButtonText:
            message.cancelButton && message.cancelButton !== ''
              ? res[`Generic.Buttons.${message.cancelButton}`]
              : '',
        }).then((result) => {
          if (result.value) {
            callback();
          }
        });
      });
  }

  confirmModalClosing(func: any, isUpdate: boolean): void {
    this.translate
      .get([
        `Messages.GeneralConfirmIngresada`,
        `Messages.GeneralConfirmEditada`,
      ])
      .subscribe((res: any) => {
        this.openConfirm(
          {
            text: 'GeneralConfirm',
            cancelButton: 'No',
            confirmButton: 'Si',
          },
          isUpdate
            ? res[`Messages.GeneralConfirmEditada`]
            : res[`Messages.GeneralConfirmIngresada`],
          func,
          true
        );
      });
  }

  confirmAction(func: any, Mensaje: string, param: any = ''): void {
    this.openConfirm(
      {
        text: Mensaje,
        cancelButton: 'No',
        confirmButton: 'Si',
      },
      param,
      func,
      true
    );
  }

  validateError(error: HttpErrorResponse): void {
    if (error.error && error.error.messageTag) {
      this.showMessage(this.processMesagge(error.error));
    } else {
      this.showMessage({
        text: 'ErrorNoControlado',
        confirmButton: 'Ok',
        typeMessage: 'error',
      });
    }
  }

  validateSuccess(response: HttpResponse<any>): void {
    if (response.body && response.body.messageTag) {
      this.showMessage(this.processMesagge(response.body));
    }
  }

  processMesagge(response: any): Message {
    return {
      text: response.messageTag,
      tags: response.tags,
      title: response.titleTag,
      details: response.detail,
      typeMessage:
        response.categoryMessage === 200
          ? 'success'
          : response.categoryMessage === 500
          ? 'error'
          : response.categoryMessage === 400
          ? 'warning'
          : 'info',
    };
  }
}

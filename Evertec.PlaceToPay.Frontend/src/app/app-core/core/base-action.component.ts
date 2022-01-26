import { Input, Output, EventEmitter } from '@angular/core';
import { Utility } from '@appcore/utility';

export class BaseActionComponent {
    @Input() ActiveDelete = Utility.DEFAULT_CONFIG_APP.DefaultActiveDelete;
    @Input() ActiveUpdate = Utility.DEFAULT_CONFIG_APP.DefaultActiveUpdate;
    @Input() isViewUpdate: boolean;
    @Input() isViewData: boolean;
    @Input() isViewPayment: boolean;
    @Input() isViewCreate: boolean;
    @Input() disabled: boolean;

    @Input() iconCreate = Utility.DEFAULT_CONFIG_APP.Icon.Create;
    @Input() iconUpdate = Utility.DEFAULT_CONFIG_APP.Icon.Update;
    @Input() iconDelete = Utility.DEFAULT_CONFIG_APP.Icon.Delete;
    @Input() iconCancel = Utility.DEFAULT_CONFIG_APP.Icon.Cancel;
    @Input() iconPayment = Utility.DEFAULT_CONFIG_APP.Icon.Payment;

    @Output() cancelClick = new EventEmitter();
    @Output() createClick = new EventEmitter();
    @Output() updateClick = new EventEmitter();
    @Output() deleteClick = new EventEmitter();
    @Output() paymentClick = new EventEmitter();

    onUpdateClick($event: any): void {
        this.updateClick.emit($event);
    }

    onCreateClick($event: any): void {
        this.createClick.emit($event);
    }

    onCancelClick($event: any): void {
        this.cancelClick.emit($event);
    }

    onDeleteClick($event: any): void {
        this.deleteClick.emit($event);
    }

    onPaymentClick($event: any): void {
        this.paymentClick.emit($event);
    }
}

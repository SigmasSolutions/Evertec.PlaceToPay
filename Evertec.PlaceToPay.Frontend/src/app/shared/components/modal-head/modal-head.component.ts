import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utility } from 'src/app/app-core/core/utility';

@Component({
    selector: 'app-modal-head',
    templateUrl: './modal-head.component.html'
})
export class ModalHeadComponent {
    @Input() iconUpdate = Utility.DEFAULT_CONFIG_APP.Icon.Update;
    @Input() iconView = Utility.DEFAULT_CONFIG_APP.Icon.View;
    @Input() iconCreate = Utility.DEFAULT_CONFIG_APP.Icon.Create;

    @Input() titleName: string;
    @Input() isViewUpdate: boolean;
    @Input() isViewData: boolean;
    @Output() eventCloseModal = new EventEmitter();

    eventClose($e: any) {
        this.eventCloseModal.emit($e);
    }
}

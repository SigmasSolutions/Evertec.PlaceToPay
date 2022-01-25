import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utility } from 'src/app/app-core/core/utility';

@Component({
    selector: 'app-title-head',
    templateUrl: './title-head.component.html',
    styleUrls: ['./title-head.component.scss']
})
export class TitleHeadComponent {
    @Input() iconCreate = Utility.DEFAULT_CONFIG_APP.Icon.Create;
    @Input() iconTitleHead = Utility.DEFAULT_CONFIG_APP.Icon.TitleHead;

    @Input() titleName: string;
    @Input() subTitleName: string;
    @Input() disabled: boolean;
    @Input() buttonName: string;
    @Output() event = new EventEmitter();
    @Input() hideLine = false;
    @Input() isFloat = true;

    handleClick($e: any) {
        this.event.emit($e);
    }
}

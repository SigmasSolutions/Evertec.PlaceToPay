import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utility } from 'src/app/app-core/core/utility';

@Component({
  selector: 'app-table-btn',
  templateUrl: './table-btn.component.html'
})
export class TableBtnComponent {
  @Input() ActiveDelete = Utility.DEFAULT_CONFIG_APP.DefaultActiveDelete;
  @Input() ActiveUpdate = Utility.DEFAULT_CONFIG_APP.DefaultActiveUpdate;
  @Input() ActiveView = true;

  @Input() iconUpdate = Utility.DEFAULT_CONFIG_APP.Icon.Update;
  @Input() iconDelete = Utility.DEFAULT_CONFIG_APP.Icon.Delete;
  @Input() iconView = Utility.DEFAULT_CONFIG_APP.Icon.View;

  @Output() updateClick = new EventEmitter();
  @Output() eliminarClick = new EventEmitter();
  @Output() varClick = new EventEmitter();

  btnUpdateClick($event: any): void {
    this.updateClick.emit($event);
  }

  btnEliminarClick($event: any): void {
    this.eliminarClick.emit($event);
  }

  btnVerClick($event: any): void {
    this.varClick.emit($event);
  }
}

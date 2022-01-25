import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table-th',
  templateUrl: './table-th.component.html'
})
export class TableThComponent {
  @Input() titleName: string;
  @Input() columnName: string;
  @Input() typeFilter = 'string';
  @Input() sort: Sort;
  @Output() eventChangeFilter = new EventEmitter();

  btnFilterClick($event: any): void {
    this.eventChangeFilter.emit($event);
  }
}

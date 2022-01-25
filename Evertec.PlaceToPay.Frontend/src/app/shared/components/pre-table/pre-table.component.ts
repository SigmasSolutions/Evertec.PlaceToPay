import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Paged } from '@appcore/objects/baselist.paged.object';

@Component({
  selector: 'app-pre-table',
  templateUrl: './pre-table.component.html'
})
export class PreTableComponent {
  @Output() eventChangeNumber = new EventEmitter();
  @Output() eventExport = new EventEmitter();
  @Output() eventUpdateData = new EventEmitter();
  @Input() pagedPage: Paged;
  @Input() countRecord: number;

  constructor() { }

  onExportClick(): void {
    this.eventExport.emit();
  }

  onUpdateDataClick(): void {
    this.eventUpdateData.emit();
  }
}

import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Utility } from 'src/app/app-core/core/utility';
import { Paged } from 'src/app/app-core/core/objects/baselist.paged.object';

@Component({
  selector: 'app-number-records',
  templateUrl: './number-records.component.html',
})
export class NumberRecordsComponent implements OnInit {
  @Output() eventChangeNumber = new EventEmitter();
  @Input() pagedPage: Paged;
  @Input() countRecord: number;

  numberRecords = Utility.DEFAULT_CONFIG_APP.DEFAULT_NUMBERRECORDS;
  listNumberRecords = [
    this.numberRecords,
    this.numberRecords * 2,
    this.numberRecords * 5,
    this.numberRecords * 10,
    this.numberRecords * 15,
    this.numberRecords * 20,
  ];

  ngOnInit() {
    if (
      this.pagedPage &&
      this.pagedPage.pageSize &&
      this.pagedPage.pageSize > 0
    ) {
      this.numberRecords = this.pagedPage.pageSize;
    }
  }

  handleChange(): void {
    this.eventChangeNumber.emit(this.numberRecords);
  }
}

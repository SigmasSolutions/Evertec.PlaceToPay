import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paged } from 'src/app/app-core/core/objects/baselist.paged.object';
import { Utility } from 'src/app/app-core/core/utility';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {
  @Input() pagedPage: Paged;
  @Input() page: number;
  @Output() event = new EventEmitter();
  maxSize = Utility.DEFAULT_CONFIG_APP.DEFAULT_SHOWPAGE;

  pageChange($e: any): void {
    this.event.emit($e);
  }
}

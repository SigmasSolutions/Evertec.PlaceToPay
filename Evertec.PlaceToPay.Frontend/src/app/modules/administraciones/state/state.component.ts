import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from '@appcore/baselist.component';
import { MessageService } from '@appcore/services/message.service';
import { StateService } from './services/state.service';
import { State, StatePaged } from './services/state.object';
import { StateModalComponent } from './modals/state.modal.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html'
})
export class StateComponent extends BaseListComponent<State> implements OnInit {
  listState: StatePaged;

  constructor(readonly stateService: StateService,
              readonly modalService: NgbModal,
              readonly messageService: MessageService) {
    super(stateService, modalService, messageService);
  }

  ngOnInit() {
    this.$Modal = StateModalComponent;
    this.$ListOrdered = () => {
      this.stateService.getPagedOrderedSort(this.page, this.sort, this.numberRecords, this.filters)
             .subscribe((res: StatePaged) => { this.listState = res; });
    };
    this.$ListOrdered();
  }

  onDelete(item: State) { this.Delete(item.idState); }
}

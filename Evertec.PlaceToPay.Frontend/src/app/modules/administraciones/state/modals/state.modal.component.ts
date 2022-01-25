import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '@appcore/basemodal.component';
import { MessageService } from '@appcore/services/message.service';
import { StateService } from '../services/state.service';
import { State } from '../services/state.object';


@Component({
    selector: 'app-state-modal',
    templateUrl: './state.modal.component.html'
})
export class StateModalComponent extends BaseModalComponent<State> implements OnInit {

    constructor(readonly stateService: StateService,
                readonly modal: NgbActiveModal,
                readonly messageService: MessageService) {
        super(stateService, modal, messageService);
        this.objEntidad = {};
    }

    ngOnInit(): void { }

    onDelete() { this.Delete(this.objEntidad.idState); }
}

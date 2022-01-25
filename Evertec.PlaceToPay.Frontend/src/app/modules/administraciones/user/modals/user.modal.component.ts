import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '@appcore/basemodal.component';
import { MessageService } from '@appcore/services/message.service';
import { UserService } from '../services/user.service';
import { User } from '../services/user.object';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user.modal.component.html'
})
export class UserModalComponent extends BaseModalComponent<User> implements OnInit {

    constructor(readonly userService: UserService,
                readonly modal: NgbActiveModal,
                readonly messageService: MessageService) {
        super(userService, modal, messageService);
        this.objEntidad = {};
    }

    ngOnInit(): void {
    }

    onDelete() { this.Delete(this.objEntidad.idUser); }
} 

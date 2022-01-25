import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '@appcore/basemodal.component';
import { MessageService } from '@appcore/services/message.service';
import { OrderService } from '../services/order.service';
import { Order } from '../services/order.object';


@Component({
    selector: 'app-order-modal',
    templateUrl: './order.modal.component.html'
})
export class OrderModalComponent extends BaseModalComponent<Order> implements OnInit {

    constructor(readonly orderService: OrderService,
                readonly modal: NgbActiveModal,
                readonly messageService: MessageService) {
        super(orderService, modal, messageService);
        this.objEntidad = {};
    }

    ngOnInit(): void { }

    onDelete() { this.Delete(this.objEntidad.OrderId); }
}

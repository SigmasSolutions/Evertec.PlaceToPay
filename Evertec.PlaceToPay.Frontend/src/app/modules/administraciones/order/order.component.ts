import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from '@appcore/baselist.component';
import { MessageService } from '@appcore/services/message.service';
import { OrderService } from './services/order.service';
import { Order, OrderResult } from './services/order.object';
import { OrderModalComponent } from './modals/order.modal.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent extends BaseListComponent<Order> implements OnInit {
  listOrder: OrderResult;

  constructor(readonly orderService: OrderService,
              readonly modalService: NgbModal,
              readonly messageService: MessageService) {
    super(orderService, modalService, messageService);
  }

  ngOnInit() {
    this.$Modal = OrderModalComponent;
    this.$ListOrdered = () => {
      this.orderService.getOrders("C673086D-2BEC-4B4B-9A9A-3DD9D0A28B53")
             .subscribe((res: OrderResult) => { this.listOrder = res; });
    };
    this.$ListOrdered();
  }

  onDelete(item: Order) { this.Delete(item.OrderId); }
}

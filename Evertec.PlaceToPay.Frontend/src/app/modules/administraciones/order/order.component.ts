import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from '@appcore/baselist.component';
import { MessageService } from '@appcore/services/message.service';
import { OrderService } from './services/order.service';
import { Order, OrderResult } from './services/order.object';
import { OrderModalComponent } from './modals/order.modal.component';
import { LocalStorageService } from 'ngx-localstorage';
import {  UserTokenResult } from './../user/services/user.object';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent extends BaseListComponent<Order> implements OnInit {
  listOrder: OrderResult;

  constructor(readonly orderService: OrderService,
              readonly modalService: NgbModal,
              readonly messageService: MessageService,
              readonly localStorage: LocalStorageService) {
    super(orderService, modalService, messageService);
  }

  ngOnInit() {
    this.$Modal = OrderModalComponent;
    const user: UserTokenResult = JSON.parse(this.localStorage.get("user"));
    this.$ListOrdered = () => {
      this.orderService.getOrders(user.result.userId)
             .subscribe((res: OrderResult) => { 
               this.listOrder = res; 
          });
    };
    this.$ListOrdered();
  }

  onDelete(item: Order) { this.Delete(item.orderId); }
}

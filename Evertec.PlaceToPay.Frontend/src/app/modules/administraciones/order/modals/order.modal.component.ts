import { Component, OnInit, Type } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '@appcore/basemodal.component';
import { MessageService } from '@appcore/services/message.service';
import { OrderService } from '../services/order.service';
import { Order } from '../services/order.object';
import { UserTokenResult } from '../../user/services/user.object';
import { LocalStorageService } from 'ngx-localstorage';
import { PaymentService } from './../../payment/services/payment.service';
import { Status, StatusEnum, StatusResult } from '../../status/services/status.object';
import { StatusService } from '../../status/services/status.service';
import { PaymentResult } from '../../payment/services/payment.object';


@Component({
    selector: 'app-order-modal',
    templateUrl: './order.modal.component.html'
})
export class OrderModalComponent extends BaseModalComponent<Order> implements OnInit {
    isPayment = false;
    isCreate = false;
    user: UserTokenResult;
    lstStatus: Status[];

    constructor(readonly orderService: OrderService,
                readonly modal: NgbActiveModal,
                readonly messageService: MessageService,
                readonly localStorage: LocalStorageService,
                readonly paymentService: PaymentService,
                readonly statusService: StatusService) {
        super(orderService, modal, messageService);
        this.objEntidad = {};
    }

    ngOnInit(): void {
        this.user = JSON.parse(this.localStorage.get("user"));
        this.getStatusOrder();
        this.validateStatusOrder();
     }

    validateStatusOrder() {
        if(this.objEntidad.statusId !== undefined && this.objEntidad.statusId !== StatusEnum.payed){
            this.isPayment = true;
            this.isCreate = false;
        }
        else{
            this.isUpdate = false;
            this.isPayment = false;
            this.isCreate = true;
        }
    }

    getStatusOrder() {
        this.statusService.getStatus().subscribe((res: StatusResult) => {
            this.lstStatus = res.result;
        });
    }
    
    onCreateOrder(){ 
        this.objEntidad.userId = this.user.result.userId;
        this.onCreate();
    }

    onPayment(): void {
        this.paymentService.makePayment(this.objEntidad.orderId).subscribe((res: PaymentResult) => {
          if(res.success){
            document.location.href = res.result.processUrl;
          }
          else{

          }
        });
      }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from '@appcore/baselist.component';
import { MessageService } from '@appcore/services/message.service';
import { LocalStorageService } from 'ngx-localstorage';
import {  UserTokenResult } from './../user/services/user.object';
import { Payment, PaymentResult } from './services/payment.object';
import { PaymentService } from './services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { StatusEnum } from '../status/services/status.object';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent extends BaseListComponent<Payment> implements OnInit {
  orderId: string;
  paymentId: string;
  payment: Payment;
  status: string;
  color: string;
  
  constructor(readonly paymentService: PaymentService,
              readonly modalService: NgbModal,
              readonly route: ActivatedRoute,
              readonly messageService: MessageService,
              readonly localStorage: LocalStorageService) {
    super(paymentService, modalService, messageService);
  }

  ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderId = params['orderId']; 
            this.paymentId = params['paymentId']; 
        });

        this.paymentService.updatePayment(this.orderId, this.paymentId).subscribe((res: PaymentResult) => {
            if(res.success){
                this.payment = res.result;
                this.status = this.getStatusText(res.result.order.statusId);
            }
        });
  }

  getStatusText(statusId: number): any {
      let status = "Pendiente";

      switch (statusId) {
          case StatusEnum.created:
              status = "Creada";
              this.color = "#7dd855";
              break;
          case StatusEnum.payed:
            status = "Aprobada";
            this.color = "#7dd855";
            break;
          case StatusEnum.reject:
            status = "Rechazada";
            this.color = "#f41634";
            break;
        case StatusEnum.pending:
            status = "Pendiente";
            this.color = "#FFA500";
            break;
          default:
             status = "Pendiente";
             this.color = "#FFA500";
              break;
      }

      return status;
  }

  getColor(){
      return this.color;
  }

}


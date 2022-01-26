import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGenericService } from '@appcore/services/base-generic.services';
import { Payment } from './payment.object';

@Injectable({
    providedIn: 'root'
})
export class PaymentService extends BaseGenericService<Payment> {
    constructor(readonly http: HttpClient) { super(http, 'Payment'); }

    makePayment(orderId: string){
        return this.http.post(
            `${this.baseAPI}/MakePayment/${orderId}`,
            {
                headers: this.refreshData(),
            }
        );
    }

    updatePayment(orderId: string, paymentId: string){
        return this.http.post(
            `${this.baseAPI}/UpdatePayment/${orderId}/${paymentId}`,
            {
                headers: this.refreshData(),
            }
        );
    }
}

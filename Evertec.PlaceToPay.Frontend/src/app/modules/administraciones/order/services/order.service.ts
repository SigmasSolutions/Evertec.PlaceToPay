import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGenericService } from '@appcore/services/base-generic.services';
import { Order } from './order.object';

@Injectable({
    providedIn: 'root'
})
export class OrderService extends BaseGenericService<Order> {
    constructor(readonly http: HttpClient) { super(http, 'Order'); }

    getOrders(userId: string){
        return this.http.get(
            `${this.baseAPI}/GetOrdersByUsers/${userId}`
        );
    }
}

import { BaseServiceResult, BaseServiceSingleResult } from '@appcore/objects/baselist.serviceResult.object';
import { Order } from '../../order/services/order.object';

export interface Payment {
    orderId?: string;
    createdAt?: string;
    processUrl?: string;
    statusId?: string;
    requestId?: string;
    order: Order;
    payer: Payer;
}

export interface Payer {
    document?: string;
    documentType?: string;
    name?: string;
    surname?: string;
}

 
export interface PaymentResult
    extends BaseServiceSingleResult<Payment> { }

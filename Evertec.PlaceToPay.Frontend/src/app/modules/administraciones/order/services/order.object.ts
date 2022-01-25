import { BaseServiceResult } from '@appcore/objects/baselist.serviceResult.object';

export interface Order {
    OrderId?: number;
    CreatedAt?: string;
    Reference?: string;
    StatusId?: string;
    Description?: string;
    Amount?: number; 
}
 
export interface OrderResult
    extends BaseServiceResult<Order> { }

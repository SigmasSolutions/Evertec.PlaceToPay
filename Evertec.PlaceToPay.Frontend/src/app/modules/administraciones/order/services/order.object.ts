import { BaseServiceResult } from '@appcore/objects/baselist.serviceResult.object';
import { Status } from '../../status/services/status.object';

export interface Order {
    orderId?: string;
    createdAt?: string;
    reference?: string;
    statusId?: number;
    description?: string;
    amount?: number; 
    userId?: string;
    status?: Status;
}
 
export interface OrderResult
    extends BaseServiceResult<Order> { }

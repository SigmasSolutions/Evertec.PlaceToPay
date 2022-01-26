import { BaseServiceResult } from '@appcore/objects/baselist.serviceResult.object';

export interface Status {
    statusId?: string;
    name?: string;
}

export enum StatusEnum {
    created = 1, 
    payed = 2, 
    reject = 3,
    pending = 4
}
 
export interface StatusResult
    extends BaseServiceResult<Status> { }

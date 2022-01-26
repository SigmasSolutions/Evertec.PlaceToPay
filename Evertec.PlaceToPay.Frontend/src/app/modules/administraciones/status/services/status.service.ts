import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGenericService } from '@appcore/services/base-generic.services';
import { Status } from './status.object';

@Injectable({
    providedIn: 'root'
})
export class StatusService extends BaseGenericService<Status> {
    constructor(readonly http: HttpClient) { super(http, 'Status'); }

    getStatus(){
        return this.http.get(
            `${this.baseAPI}/Get`,
        );
    }
}

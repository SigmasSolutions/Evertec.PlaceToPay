import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGenericService } from '@appcore/services/base-generic.services';
import { State } from './state.object';

@Injectable({
    providedIn: 'root'
})
export class StateService extends BaseGenericService<State> {
    constructor(readonly http: HttpClient) { super(http, 'State'); }
}

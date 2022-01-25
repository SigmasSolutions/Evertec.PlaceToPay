import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGenericService } from '@appcore/services/base-generic.services';
import { User } from './user.object';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseGenericService<User> {
    constructor(readonly http: HttpClient) { super(http, 'User'); }
}

import { BaseServiceResult, BaseServiceSingleResult } from '@appcore/objects/baselist.serviceResult.object';

export interface User {
    userId?: number;
    name?: string;
    email?: string;
}

export interface Login {
  email?: string;
  password?: string;
}

export interface UserToken {
  userId?: string;
  token?: string;
  email?: string;
}

export interface UserTokenResult
  extends BaseServiceSingleResult<UserToken> { }


export interface UserResult
    extends BaseServiceResult<User> { }

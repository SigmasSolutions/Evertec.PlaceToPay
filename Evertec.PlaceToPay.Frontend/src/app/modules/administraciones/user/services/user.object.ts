import { BaseListPaged } from '@appcore/objects/baselist.paged.object';

export interface User {
    idUser?: number;
    image?: string;
    identification?: string;
    fullName?: string;
    email?: string;
    password?: string;
    idProfile?: number;
    profile_Name ?: string;
    idCompany?: number;
    company_Name ?: string;
    birthdayDate?: string;
    llastAdmissionDate?: string;
    active?: boolean;
    locked?: boolean;
}

export interface Login {
  username?: string;
  password?: string;
}

export interface UserPaged
    extends BaseListPaged<User> { }

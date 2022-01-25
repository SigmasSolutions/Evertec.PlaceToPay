import { BaseListPaged } from '@appcore/objects/baselist.paged.object';

export interface State {
    idState?: number;
    icon?: string;
    name?: string;
    description?: string;
    color?: string;
    active?: boolean;
}

export interface StatePaged
    extends BaseListPaged<State> { }

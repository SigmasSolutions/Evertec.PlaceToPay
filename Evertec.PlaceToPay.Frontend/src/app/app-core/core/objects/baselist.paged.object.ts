export interface BaseListPaged<T> {
    list: T[];
    paged: Paged;
}

export interface Paged {
    page: number;
    pageSize: number;
    totalPages: number;
    maxCount: number;

    recordsFrom: number;
    recordsTo: number;
}

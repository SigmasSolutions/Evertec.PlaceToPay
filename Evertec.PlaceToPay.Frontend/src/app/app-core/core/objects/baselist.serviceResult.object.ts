export interface BaseServiceResult<T> {
    Result: T[];
    Success: boolean;
    Errors: Error[];
}

export interface Error {
    propertyName: string;
    errorMessage: string;
}

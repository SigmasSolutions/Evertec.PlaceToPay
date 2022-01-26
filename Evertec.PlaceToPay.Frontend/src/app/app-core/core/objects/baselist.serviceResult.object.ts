export interface BaseServiceResult<T> {
  result: T[];
  success: boolean;
  errors: Error[];
}

export interface BaseServiceSingleResult<T> {
  result: T;
  success: boolean;
  errors: Error[];
}

export interface Error {
  propertyName: string;
  errorMessage: string;
}

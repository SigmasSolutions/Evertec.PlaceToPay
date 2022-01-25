import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UriCachingInterceptor implements HttpInterceptor {
  private readonly cachedData = new Map<string, any>();

  constructor() {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.method !== 'GET') {
      this.cachedData.clear();
      return next.handle(httpRequest);
    }

    if (httpRequest.headers.get('reset-cache')) {
      this.cachedData.delete(httpRequest.urlWithParams);
    }

    const cachedResponse: HttpResponse<any> = this.cachedData.get(
      httpRequest.urlWithParams
    );

    if (cachedResponse) {
      return cachedResponse instanceof Observable
        ? cachedResponse
        : of(cachedResponse.clone());
    }

    const requestHandle = next.handle(httpRequest).pipe(
      tap((stateEvent) => {
        if (stateEvent instanceof HttpResponse) {
          this.cachedData.set(httpRequest.urlWithParams, stateEvent.clone());
        }
      })
    );

    this.cachedData.set(httpRequest.urlWithParams, requestHandle);

    return requestHandle;
  }
}

import { LocalStorageService } from 'ngx-localstorage';
import { Router } from '@angular/router';
import { environment } from '@env/environment.prod';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '@appcore/services/loading.service';
import { MessageService } from '@appcore/services/message.service';
import { OAuthAccessService } from '@appcore/services/oauth.access.services';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(
    readonly loadingService: LoadingService,
    readonly messageService: MessageService,
    private router: Router,
    private oauthAccessService: OAuthAccessService,
    readonly localStorageServ: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    return next.handle(this.addSubscriptionKey(request)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          this.loadingService.hideLoading();
          this.messageService.validateError(error);
        } else {
          this.localStorageServ.clear();
          this.router.navigate(['/login']);
        }

        return throwError(error);
      }),
      finalize(() => {
        this.loadingService.hideLoading();
      }),
      tap((resp: HttpResponse<any>) => {
        this.messageService.validateSuccess(resp);

        return resp;
      })
    );
  }

  addSubscriptionKey(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Ocp-Apim-Subscription-Key': environment.subscriptionKey,
        Authorization: `Bearer ${this.oauthAccessService.getAccessToken()}`,
      },
    });
  }
}

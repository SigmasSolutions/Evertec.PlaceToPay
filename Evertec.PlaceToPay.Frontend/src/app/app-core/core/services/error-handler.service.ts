import { ApplicationInsightService } from './application-insight.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
  constructor(private applicationInsightService: ApplicationInsightService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse): void {
    if (
      this.applicationInsightService &&
      typeof this.applicationInsightService.logException === 'function'
    ) {
      this.applicationInsightService.logException(error);
    }
  }
}

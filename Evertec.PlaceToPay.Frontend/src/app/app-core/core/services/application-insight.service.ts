import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Injectable({
  providedIn: 'root',
})
export class ApplicationInsightService {
  appInsights: ApplicationInsights;

  constructor() {
    if (environment.appInsights.instrumentationKey) {
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: environment.appInsights.instrumentationKey,
          enableAutoRouteTracking: true,
        },
      });

      this.appInsights.loadAppInsights();
      this.appInsights.trackPageView();
    }
  }

  logPageView(namePage?: string, url?: string) {
    if (this.appInsights) {
      this.appInsights.trackPageView({
        name: namePage,
        uri: url,
      });
    }
  }

  logEvent(nameEvent: string, properties?: { [key: string]: any }) {
    if (this.appInsights) {
      this.appInsights.trackEvent({ name: nameEvent }, properties);
    }
  }

  logMetric(
    nameMetric: string,
    averageMetric: number,
    properties?: { [key: string]: any }
  ) {
    if (this.appInsights) {
      this.appInsights.trackMetric(
        { name: nameMetric, average: averageMetric },
        properties
      );
    }
  }

  logException(exceptionLog: Error) {
    if (this.appInsights) {
      this.appInsights.trackException({
        exception: exceptionLog,
      });
    }
  }

  logTrace(messageTrace: string, properties?: { [key: string]: any }) {
    if (this.appInsights) {
      this.appInsights.trackTrace({ message: messageTrace }, properties);
    }
  }
}

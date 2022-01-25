import { LoadingService } from './app-core/core/services/loading.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppUpdateService } from '@appcore/services/app-update.service ';
import { TranslateService } from '@ngx-translate/core';
import { OAuthAccessService } from '@appcore/services/oauth.access.services';
import { ApplicationInsightService } from '@appcore/services/application-insight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isAuth = false;

  constructor(
    readonly translate: TranslateService,
    readonly titleService: Title,
    readonly oauthAccessService: OAuthAccessService,
    readonly appUpdateService: AppUpdateService,
    readonly applicationInsightService: ApplicationInsightService,
    readonly loadingService: LoadingService
  ) {
    this.translate.setDefaultLang('es');
    this.oauthAccessService.initializeOAuthService();

    this.translate.get('TextosAplicacion.PageTitle').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });

    this.loadingService.getValue().subscribe((loading) => {
      setTimeout(() => (this.isAuth = this.oauthAccessService.validAccessToken()), 100);
    });
    this.isAuth = this.oauthAccessService.validAccessToken();
  }
}

import { ErrorHandlerService } from './app-core/core/services/error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HTTPInterceptor } from '@appcore/interceptor/http.interceptor';
import { UriCachingInterceptor } from '@appcore/interceptor/uri-caching.interceptor';
import { AuthGuardService } from './app-core/guards';
import { AppUpdateService } from '@appcore/services/app-update.service ';

import { AdministracionesModule } from './modules/administraciones/administraciones.module';

import {
  InicioComponent,
  PageNotFoundComponent,
  LoginComponent,
} from './modules/app';

import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ChartsModule } from 'ng2-charts';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,

    InicioComponent,
    PageNotFoundComponent,
    LoginComponent,

    SidebarComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),

    AgmCoreModule.forRoot({
      apiKey: environment.apiKeyMap,
    }),
    AgmSnazzyInfoWindowModule,
    ChartsModule,
    RecaptchaV3Module,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    NgxLocalStorageModule.forRoot({ prefix: 'App' }),
    SweetAlert2Module.forRoot({}),

    AdministracionesModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    AuthGuardService,
    AppUpdateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UriCachingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true,
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.apikeyReCapchat },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

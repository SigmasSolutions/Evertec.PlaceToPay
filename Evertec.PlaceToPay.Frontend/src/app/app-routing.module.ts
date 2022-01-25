import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AppSpecificCanActivateGuard,
  AuthGuardService,
  AdministracionesSpecificCanActivateGuard,
} from './app-core/guards';

import {
  InicioComponent,
  PageNotFoundComponent,
  LoginComponent,
} from './modules/app';

const AppRoutes: Routes = [
  {
    path: '',
    component: InicioComponent,
    canActivate: [AuthGuardService, AppSpecificCanActivateGuard],
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'administrativo',
    loadChildren: () =>
      import('./modules/administraciones/administraciones.module').then(
        (m) => m.AdministracionesModule
      ),
    data: { breadcrumb: 'Menu.AdministrarMaestros' },
    canActivate: [AuthGuardService, AdministracionesSpecificCanActivateGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuardService, AppSpecificCanActivateGuard],
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

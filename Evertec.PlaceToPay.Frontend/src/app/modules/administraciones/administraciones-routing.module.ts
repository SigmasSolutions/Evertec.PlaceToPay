import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionesComponent } from './administraciones.component';
import { AdministracionesSpecificCanActivateGuard } from '../../app-core/guards';

import { OrderComponent } from './order/order.component';
import { StateComponent } from './state/state.component';

const AdministracionesRoutes: Routes = [
  {
    path: '',
    component: AdministracionesComponent,
    canActivate: [AdministracionesSpecificCanActivateGuard],
  },

  {
    path: 'order',
    component: OrderComponent,
    data: { breadcrumb: 'Order' },
    canActivate: [AdministracionesSpecificCanActivateGuard],
  },
  {
    path: 'state',
    component: StateComponent,
    data: { breadcrumb: 'State' },
    canActivate: [AdministracionesSpecificCanActivateGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(AdministracionesRoutes)],
  exports: [RouterModule],
})
export class AdministracionesRoutingModule {} 

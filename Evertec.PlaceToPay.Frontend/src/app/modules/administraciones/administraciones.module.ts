import { NgModule } from '@angular/core';

import { AdministracionesSpecificCanActivateGuard } from '../../app-core/guards';
import { AdministracionesRoutingModule } from './administraciones-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdministracionesComponent } from './administraciones.component';

import { OrderComponent } from './order/order.component';

import { OrderModalComponent } from './order/modals/order.modal.component';

@NgModule({
  declarations: [
    OrderComponent,

    OrderModalComponent,

    AdministracionesComponent,
  ],
  entryComponents: [
    OrderModalComponent,
  ],
  imports: [AdministracionesRoutingModule, SharedModule],
  providers: [AdministracionesSpecificCanActivateGuard],
})
export class AdministracionesModule {}

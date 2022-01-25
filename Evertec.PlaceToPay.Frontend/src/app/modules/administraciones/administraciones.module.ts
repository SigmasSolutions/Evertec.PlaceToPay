import { NgModule } from '@angular/core';

import { AdministracionesSpecificCanActivateGuard } from '../../app-core/guards';
import { AdministracionesRoutingModule } from './administraciones-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdministracionesComponent } from './administraciones.component';

import { OrderComponent } from './order/order.component';
import { StateComponent } from './state/state.component';

import { OrderModalComponent } from './order/modals/order.modal.component';
import { StateModalComponent } from './state/modals/state.modal.component';

@NgModule({
  declarations: [
    OrderComponent,
    StateComponent,

    OrderModalComponent,
    StateModalComponent,

    AdministracionesComponent,
  ],
  entryComponents: [
    OrderModalComponent,
    StateModalComponent,
  ],
  imports: [AdministracionesRoutingModule, SharedModule],
  providers: [AdministracionesSpecificCanActivateGuard],
})
export class AdministracionesModule {}

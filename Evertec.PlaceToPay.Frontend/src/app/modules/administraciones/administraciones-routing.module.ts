import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdministracionesComponent } from "./administraciones.component";
import { AdministracionesSpecificCanActivateGuard } from "../../app-core/guards";

import { OrderComponent } from "./order/order.component";
import { PaymentComponent } from "./payment/payment.component";

const AdministracionesRoutes: Routes = [
  {
    path: "",
    component: AdministracionesComponent,
    canActivate: [AdministracionesSpecificCanActivateGuard],
  },

  {
    path: "order",
    component: OrderComponent,
    data: { breadcrumb: "Order" },
    canActivate: [AdministracionesSpecificCanActivateGuard],
  },
  {
    path: "payment/:orderId/:paymentId",
    component: PaymentComponent,
    data: { breadcrumb: "Payment" },
    canActivate: [AdministracionesSpecificCanActivateGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(AdministracionesRoutes)],
  exports: [RouterModule],
})
export class AdministracionesRoutingModule {}

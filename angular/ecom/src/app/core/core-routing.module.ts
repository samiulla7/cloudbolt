import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards";
import { RegistrationModule } from "../registration/registration.module";
import { HomeModule } from "../home/home.module";
import { AddEditProductPageModule } from "../add-edit-product-page/add-edit-product-page.module";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => RegistrationModule
  },
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () => HomeModule
  },
  {
    path: "product",
    canActivate: [AuthGuard],
    loadChildren: () => AddEditProductPageModule
  },
  {
    path: "userdashboard",
    canActivate: [AuthGuard],
    loadChildren:
      "app/userdashboard-page/userdashboard-page.module#UserdashboardPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}

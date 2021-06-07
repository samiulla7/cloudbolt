import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent
  },
  {
    path: "product-details/:productId",
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

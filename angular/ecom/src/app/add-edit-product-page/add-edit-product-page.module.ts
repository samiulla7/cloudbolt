import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddEditProductPageRoutingModule } from "./add-edit-product-page-routing.module";
import { ProductFormComponent } from "./product-form/product-form.component";
import { SharedModule } from "../shared";

@NgModule({
  declarations: [ProductFormComponent],
  imports: [CommonModule, AddEditProductPageRoutingModule, SharedModule]
})
export class AddEditProductPageModule {}

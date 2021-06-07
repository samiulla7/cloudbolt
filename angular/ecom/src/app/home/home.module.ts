import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { UserProductListComponent } from "./user-product-list/user-product-list.component";
import { UploadPictureDialogComponent } from "./upload-picture-dialog/upload-picture-dialog.component";
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    ProductListComponent,
    UserProductListComponent,
    UploadPictureDialogComponent,
    ProductDetailsComponent
  ],
  imports: [CommonModule, HomeRoutingModule],
  exports: [UploadPictureDialogComponent]
})
export class HomeModule {}

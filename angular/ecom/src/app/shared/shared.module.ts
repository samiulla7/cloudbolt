import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppSidebarComponent } from "./app-sidebar/app-sidebar.component";
import { FooterCmpComponent } from "./footer-cmp/footer-cmp.component";
import { NavbarCmpComponent } from "./navbar-cmp/navbar-cmp.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { ConfirmationDialogService } from "./confirmation-dialog/confirmation-dialog.service";

@NgModule({
  declarations: [
    AppSidebarComponent,
    FooterCmpComponent,
    NavbarCmpComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationDialogService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AppSidebarComponent,
    FooterCmpComponent,
    NavbarCmpComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}

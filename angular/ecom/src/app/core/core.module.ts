import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { CoreRoutingModule } from "./core-routing.module";
// Helper
import { JwtInterceptor } from "./helper";
// Guards
import { AuthGuard } from "./guards";

// Services
import { AuthenticationService } from "./services";
import { ApiService } from "./services";

import { SharedModule } from "../shared";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    NgBootstrapFormValidationModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    ApiService
  ],
  exports: [SharedModule]
})
export class CoreModule {}

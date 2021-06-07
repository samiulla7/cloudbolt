import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "..//services";
import { SIGNUP_FORM, LOGIN_FORM } from "../constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authentication.isAuthenticated()) {
      if (this.authentication.isTimeToRenewJwtToken()) {
        if (!this.authentication.isJwtTokenExpired()) {
          // this.authentication.removeToken(state.url);
          this.router.navigate(["/auth/login"]);
          return false;
        }
      } else {
        return true;
      }
    } else {
      console.error("User is not authenticated.");
      this.router.navigate(["/auth/login"]);
      return false;
    }
  }
}

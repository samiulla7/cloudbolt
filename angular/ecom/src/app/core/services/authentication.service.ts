import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
declare var $: any;
import {
  API_GET_AUTH_LOGIN,
  API_REGISTER,
  API_DJNAGO_LOGOUT
} from "../constants";
@Injectable()
export class AuthenticationService {
  token = {
    access_token: null,
    expiry_date: null,
    user_details: {
      username: null,
      first_name: null,
      is_admin: false
    }
  };
  isUserAuthenticated = new BehaviorSubject(false);
  isUserAuthenticatedObservable = this.isUserAuthenticated.asObservable();
  isAdmin = new BehaviorSubject("");
  isAdminObservable = this.isAdmin.asObservable();
  tokenKey: any = "currentUser";
  jwtHelper: any = new JwtHelperService();
  constructor(private router: Router, private http: HttpClient) {}

  updateIsUserAuthenticatedFlag(flag: boolean) {
    this.isUserAuthenticated.next(flag);
  }

  updateIsAdminFlag(flag: string) {
    this.isAdmin.next(flag);
  }

  // User Login
  login(username, password) {
    const auth_url = API_GET_AUTH_LOGIN;
    return this.http
      .post<any>(auth_url, { username: username, password: password })
      .map(data => {
        console.log(data, "============");
        if (data && data.status == "success") {
          this.token.access_token = data.token;
          this.token.user_details.username = data.username;
          this.token.user_details.first_name = data.first_name;
          this.token.user_details.is_admin = data.is_admin;
          this.token.expiry_date = this.jwtHelper.getTokenExpirationDate(
            data.token.access
          );
          this.setToken(this.token);
        } else if (data && data.status != "success") {
          console.error(data.message);
        } else {
          console.error("user does not exists !");
        }
        return data;
      });
  }

  register(username, email, password, first_name, last_name) {
    console.log(username, email, password, first_name, last_name);
    return this.http
      .post<any>(API_REGISTER, {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email
      })
      .map(data => {
        return data;
      });
  }

  // User Logout
  logout() {
    this.removeToken();
  }

  removeToken() {
    if (this.isAuthenticated()) {
      localStorage.removeItem(this.tokenKey);
      //Following line added for setting updateIsUserAuthenticatedFlag to false
      this.isAuthenticated();
      this.router.navigate(["/"]);
    }
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  isAuthenticated() {
    let token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.updateIsUserAuthenticatedFlag(true);
      token = JSON.parse(token);
      let ud = token["user_details"];
      if (ud != undefined) {
        if (ud["is_admin"]) {
          this.updateIsAdminFlag("admin");
        } else {
          this.updateIsAdminFlag("user");
        }
      } else {
        this.updateIsAdminFlag("");
      }
      return true;
    } else {
      this.updateIsUserAuthenticatedFlag(false);
      this.updateIsAdminFlag("");
      return false;
    }
  }

  getToken() {
    if (this.isAuthenticated()) {
      return JSON.parse(localStorage.getItem(this.tokenKey));
    } else {
      return null;
    }
  }

  getAccessToken() {
    const json_data = this.getToken();
    if (json_data) {
      return json_data["access_token"]["access"];
    } else {
      return null;
    }
  }

  getUserName() {
    let t = localStorage.getItem(this.tokenKey);
    if (t != undefined) {
      t = JSON.parse(t);
      if (t["user_details"] != undefined) {
        return t["user_details"]["first_name"];
      }
    }
    return "";
  }

  getTokenUserDetails() {
    const token_data = this.getToken();
    if (token_data) {
      return token_data["user_details"];
    } else {
      return null;
    }
  }

  getExpiryTime() {
    const jwt_token = this.getAccessToken();
    if (jwt_token) {
      return this.jwtHelper.decodeToken(jwt_token).exp;
    } else {
      return 0;
    }
  }

  isJwtTokenExpired() {
    const cr_token = this.getAccessToken();
    if (cr_token) {
      return this.jwtHelper.isTokenExpired(cr_token);
    } else {
      return true;
    }
  }

  isTimeToRenewJwtToken() {
    const expiry_time = this.getExpiryTime();
    if (Math.round(new Date().getTime() / 1000) > expiry_time - 300) {
      console.log(
        "isTimeToRenewJwtToken: yes token expired:",
        expiry_time - 150
      );
      return true;
    } else {
      return false;
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/services";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  needToShow: boolean;
}
// export const ROUTES: RouteInfo[] = [
//   { path: "/", title: "Dashboard", icon: "pe-7s-graph", class: "" },
//   { path: "/add-product", title: "Add Product", icon: "pe-7s-user", class: "" }
//   // { path: "/table", title: "Table List", icon: "pe-7s-note2", class: "" },
//   // {
//   //   path: "/typography",
//   //   title: "Typography",
//   //   icon: "pe-7s-news-paper",
//   //   class: ""
//   // },
//   // { path: "/icons", title: "Icons", icon: "pe-7s-science", class: "" },
//   // { path: "/maps", title: "Maps", icon: "pe-7s-map-marker", class: "" },
//   // {
//   //   path: "/notifications",
//   //   title: "Notifications",
//   //   icon: "pe-7s-bell",
//   //   class: ""
//   // },
//   // {
//   //   path: "/upgrade",
//   //   title: "Upgrade to PRO",
//   //   icon: "pe-7s-rocket",
//   //   class: "active-pro"
//   // }
// ];
@Component({
  selector: "app-sidebar",
  templateUrl: "./app-sidebar.component.html",
  styleUrls: ["./app-sidebar.component.css"]
})
export class AppSidebarComponent implements OnInit {
  isAdmin = false;
  isAuthenticated: boolean = false;
  menuItems: any[];

  ROUTES: RouteInfo[] = [
    {
      path: "/",
      title: "Dashboard",
      icon: "pe-7s-graph",
      class: "",
      needToShow: true
    },
    {
      path: "/product/create",
      title: "Add Product",
      icon: "pe-7s-user",
      class: "",
      needToShow: this.isAdmin
    }
    // { path: "/table", title: "Table List", icon: "pe-7s-note2", class: "" },
    // {
    //   path: "/typography",
    //   title: "Typography",
    //   icon: "pe-7s-news-paper",
    //   class: ""
    // },
    // { path: "/icons", title: "Icons", icon: "pe-7s-science", class: "" },
    // { path: "/maps", title: "Maps", icon: "pe-7s-map-marker", class: "" },
    // {
    //   path: "/notifications",
    //   title: "Notifications",
    //   icon: "pe-7s-bell",
    //   class: ""
    // },
    // {
    //   path: "/upgrade",
    //   title: "Upgrade to PRO",
    //   icon: "pe-7s-rocket",
    //   class: "active-pro"
    // }
  ];

  constructor(private auth: AuthenticationService) {
    this.auth.isUserAuthenticatedObservable.subscribe(res => {
      this.isAuthenticated = res;
    });
    this.auth.isAdminObservable.subscribe(res => {
      console.log(res);
      if (res == "admin") {
        this.isAdmin = true;
        this.ROUTES[1].needToShow = true;
      } else {
        this.isAdmin = false;
        this.ROUTES[1].needToShow = false;
      }
    });
  }

  ngOnInit(): void {
    this.menuItems = this.ROUTES.filter(menuItem => menuItem);
  }

  logout() {
    this.auth.logout();
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}

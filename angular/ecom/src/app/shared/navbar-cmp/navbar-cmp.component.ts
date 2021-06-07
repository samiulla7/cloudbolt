import { Component, OnInit, ElementRef } from "@angular/core";
import { AuthenticationService } from "../../core/services";
import { Router } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

@Component({
  selector: "navbar-cmp",
  templateUrl: "./navbar-cmp.component.html",
  styleUrls: ["./navbar-cmp.component.css"]
})
export class NavbarCmpComponent implements OnInit {
  userRole: string = "";
  isAuthenticated: boolean = false;
  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    location: Location,
    private element: ElementRef,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.auth.isUserAuthenticatedObservable.subscribe(res => {
      this.isAuthenticated = res;
    });
    this.auth.isAdminObservable.subscribe(res => {
      if (res == "admin") {
        this.userRole = "Welcome Admin";
      } else {
        let fn = this.auth.getUserName();
        if (fn != null && fn != undefined) {
          this.userRole = "Welcome " + fn;
        }
      }
    });
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/auth/login"]);
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);
    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}

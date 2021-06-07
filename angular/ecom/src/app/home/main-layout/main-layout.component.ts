import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { AuthenticationService } from "../../core/services";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PopStateEvent
} from "@angular/common";
import PerfectScrollbar from "perfect-scrollbar";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.css"]
})
export class MainLayoutComponent implements OnInit {
  isAmin = false;
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    public location: Location,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.auth.isAdminObservable.subscribe(res => {
      if (res == "admin") {
        this.isAmin = true;
      } else {
        this.isAmin = false;
      }
    });
  }

  ngOnInit() {
    console.log(this.router);
    const isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;

    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function

      document
        .getElementsByTagName("body")[0]
        .classList.add("perfect-scrollbar-on");
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("perfect-scrollbar-off");
    }
    const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
    const elemSidebar = <HTMLElement>(
      document.querySelector(".sidebar .sidebar-wrapper")
    );

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });
    this._router = this.router.events
      // .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
      });
    // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    //   let ps = new PerfectScrollbar(elemSidebar, {
    //     wheelPropagation: true
    // });
    // }
  }
  ngAfterViewInit() {
    this.runOnRouteChange();
  }
  isMap(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }
  runOnRouteChange(): void {
    // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    //   const elemMainPanel = <HTMLElement>document.querySelector(".main-panel");
    //   const ps = new PerfectScrollbar(elemMainPanel);
    //   ps.update();
    // }
  }
  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
      navigator.platform.toUpperCase().indexOf("IPAD") >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}

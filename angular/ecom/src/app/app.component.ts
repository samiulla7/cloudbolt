import { Component } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PopStateEvent
} from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "ecom";
  constructor(public location: Location, private router: Router) {}

  isMap(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }
}

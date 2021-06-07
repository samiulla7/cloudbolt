import { Component, OnInit } from "@angular/core";

@Component({
  selector: "footer-cmp",
  templateUrl: "./footer-cmp.component.html",
  styleUrls: ["./footer-cmp.component.css"]
})
export class FooterCmpComponent implements OnInit {
  test: Date = new Date();
  constructor() {}

  ngOnInit(): void {}
}

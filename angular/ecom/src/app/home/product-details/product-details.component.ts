import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../core/services";
import { Router, ActivatedRoute } from "@angular/router";
import { DOMAIN_WITHOUT_TRAILING_SLASH } from "../../core/constants";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  productId = "";
  productDetails;
  domain = DOMAIN_WITHOUT_TRAILING_SLASH;

  constructor(
    private api: ApiService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = params.get("productId");
    });
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.api.retrieveProductApi({ product_id: this.productId }).subscribe(
      res => {
        console.log(res);
        this.productDetails = res.product_details;
      },
      err => {
        console.error(err);
        this.api.showNotification("top", "center", err.message, "danger");
      }
    );
  }

  goTOHome() {
    this.router.navigate(["/"]);
  }
}

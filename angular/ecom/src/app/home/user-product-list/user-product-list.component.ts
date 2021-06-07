import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../core/services";
import { DOMAIN_WITHOUT_TRAILING_SLASH } from "../../core/constants";

@Component({
  selector: "app-user-product-list",
  templateUrl: "./user-product-list.component.html",
  styleUrls: ["./user-product-list.component.css"]
})
export class UserProductListComponent implements OnInit {
  productList: any = [];
  domain = DOMAIN_WITHOUT_TRAILING_SLASH;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productList = this.api.getProductList();
    if (this.productList == undefined || this.productList == "") {
      this.api.getAllProductsListApi().subscribe(res => {
        console.log(res);
        this.productList = res;
        this.api.setProductList(res);
      });
    }
  }
}

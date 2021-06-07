import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../core/services";
import { ApiService } from "../../core/services";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  pageTitle = "Add Product";
  currentPageUrl = "";
  productId = "";
  isAddForm = true;

  productFormGroup: FormGroup;
  product_name = new FormControl("", [Validators.required]);
  product_description = new FormControl("", [Validators.required]);
  category = new FormControl("", [Validators.required]);
  quantity_per_unit = new FormControl("", [Validators.required]);
  unit_price = new FormControl("", [Validators.required]);
  color = new FormControl("", []);
  size = new FormControl("", []);

  error_message: any = {
    messsage: null
  };

  constructor(
    private authentication: AuthenticationService,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {
    this.currentPageUrl = this.router.url;
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = params.get("productId");
    });
  }

  ngOnInit(): void {
    console.log(this.currentPageUrl, "this.cur");
    if (this.currentPageUrl == "/product/update") {
      this.pageTitle = "Update Product";
    } else {
      this.pageTitle = "Add Product";
    }
    this.productFormGroup = this.fb.group({
      product_name: new FormControl("", [Validators.required]),
      product_description: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      quantity_per_unit: new FormControl("", [Validators.required]),
      unit_price: new FormControl("", [Validators.required]),
      color: new FormControl("", []),
      size: new FormControl("", [])
    });
    if (
      this.productId != "" &&
      this.productId != null &&
      this.currentPageUrl.includes("/product/update")
    ) {
      this.isAddForm = false;
      this.api.retrieveProductApi({ product_id: this.productId }).subscribe(
        res => {
          console.log(res);
          if (res.product_details != undefined) {
            this.productFormGroup.patchValue({
              product_name: res.product_details["product_name"],
              product_description: res.product_details["product_description"],
              category: res.product_details["category"],
              quantity_per_unit: res.product_details["quantity_per_unit"],
              unit_price: res.product_details["unit_price"],
              color: res.product_details["color"],
              size: res.product_details["size"]
            });
          }
        },
        err => {
          console.error(err);
          this.api.showNotification("top", "center", err.message, "danger");
        }
      );
    } else {
      this.isAddForm = true;
    }
  }

  get pf() {
    return this.productFormGroup.controls;
  }

  get formDataSubmit() {
    return {
      product_name: this.pf.product_name.value,
      product_description: this.pf.product_description.value,
      category: this.pf.category.value,
      quantity_per_unit: this.pf.quantity_per_unit.value,
      unit_price: this.pf.unit_price.value,
      color: this.pf.color.value,
      size: this.pf.size.value
    };
  }

  submit() {
    console.log(this.formDataSubmit);
    if (this.isAddForm) {
      this.api.createProductApi(this.formDataSubmit).subscribe(
        res => {
          console.log(res);
          this.api.setProductList(undefined);
          this.api.showNotification("top", "center", res.message, "success");
          this.router.navigate(["/"]);
        },
        err => {
          this.api.showNotification("top", "center", err.message, "danger");
        }
      );
    } else {
      let data = this.formDataSubmit;
      data["product_id"] = this.productId;
      if (this.productId != "" && this.productId != null) {
        this.api.updateProductApi(data).subscribe(
          res => {
            this.api.setProductList(undefined);
            this.api.showNotification("top", "center", res.message, "success");
            this.router.navigate(["/"]);
          },
          err => {
            this.api.showNotification("top", "center", err.message, "danger");
          }
        );
      } else {
        this.api.showNotification(
          "top",
          "center",
          "Product id could not be found.",
          "danger"
        );
      }
    }
  }
}

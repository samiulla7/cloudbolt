import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../core/services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DOMAIN_WITHOUT_TRAILING_SLASH } from "../../core/constants";
import { Router } from "@angular/router";
import { ConfirmationDialogService } from "../../shared/confirmation-dialog/confirmation-dialog.service";
import { UploadPictureDialogComponent } from "../upload-picture-dialog/upload-picture-dialog.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  productList: any = [];
  domain = DOMAIN_WITHOUT_TRAILING_SLASH;

  constructor(
    private api: ApiService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal
  ) {}

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

  uploadPicture(id) {
    console.log("Upload pic : ", id);
    const modalRef = this.modalService.open(UploadPictureDialogComponent, {
      size: "lg"
    });
    modalRef.componentInstance.productId = id;
  }

  edit(id) {
    console.log("Edit : ", id);
    this.router.navigate(["product/update"], {
      queryParams: { productId: id }
    });
  }

  delete(id) {
    this.confirmationDialogService
      .confirm("Please confirm..", "Do you really want to delete this record ?")
      .then(confirmed => {
        if (confirmed) {
          this.api.deleteProductApi({ product_id: id }).subscribe(
            res => {
              this.api.showNotification(
                "top",
                "center",
                res.message,
                "success"
              );
              this.api.setProductList(undefined);
              this.getProductList();
            },
            err => {
              this.api.showNotification("top", "center", err.message, "danger");
            }
          );
        }
      })
      .catch(() =>
        console.log(
          "User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)"
        )
      );
  }
}

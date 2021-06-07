import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../core/services";
import { Router } from "@angular/router";
import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { API_UPLOAD_PICTURE_PRODUCT } from "../../core/constants";
@Component({
  selector: "app-upload-picture-dialog",
  templateUrl: "./upload-picture-dialog.component.html",
  styleUrls: ["./upload-picture-dialog.component.css"]
})
export class UploadPictureDialogComponent implements OnInit {
  @Input() productId: string;
  filesEvent: File[];
  percentDone: number;
  uploadSuccess: boolean;
  constructor(
    private activeModal: NgbActiveModal,
    private api: ApiService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fileUpload() {
    console.log(this.filesEvent, this.productId);
    if (
      this.filesEvent != undefined &&
      this.filesEvent.length > 0 &&
      this.productId != "" &&
      this.productId != undefined &&
      this.productId != null
    ) {
      console.log(this.filesEvent, this.productId);
      let formData = new FormData();
      Array.from(this.filesEvent).forEach(f => formData.append("picture", f));
      formData.append("product_id", this.productId);
      this.http
        .post(API_UPLOAD_PICTURE_PRODUCT, formData, {
          reportProgress: true,
          observe: "events"
        })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.uploadSuccess = true;
            this.api.setProductList(undefined);
            this.dismiss();
            window.location.reload();
          }
        });
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  storeFiles(f: File[]) {
    this.filesEvent = f;
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  API_GET_PRODUCT_LIST,
  API_CREATE_PRODUCT,
  API_UPDATE_PRODUCT,
  API_RETRIEVE_PRODUCT,
  API_DELETE_PRODUCT
} from "../constants";
declare var $: any;
@Injectable()
export class ApiService {
  productList: Array<any>;
  constructor(private http: HttpClient) {}

  getAllProductsListApi() {
    return this.http.get<any>(API_GET_PRODUCT_LIST);
  }

  getAllProductsListApiSubscribe() {
    this.getAllProductsListApi().subscribe(
      data => {
        this.setProductList(data);
      },
      error => {
        console.error("product list: error", error);
      }
    );
  }

  setProductList(list: Array<any>) {
    this.productList = list;
  }

  getProductList(): any {
    return this.productList;
  }

  createProductApi(data) {
    return this.http.post<any>(API_CREATE_PRODUCT, data);
  }

  retrieveProductApi(data) {
    return this.http.post<any>(API_RETRIEVE_PRODUCT, data);
  }

  updateProductApi(data) {
    return this.http.post<any>(API_UPDATE_PRODUCT, data);
  }

  deleteProductApi(data) {
    return this.http.post<any>(API_DELETE_PRODUCT, data);
  }

  showNotification(from, align, msg, _type) {
    const type = ["", "info", "success", "warning", "danger"];

    var color = Math.floor(Math.random() * 4 + 1);
    $.notify(
      {
        icon: "pe-7s-gift",
        message: msg
      },
      {
        type: _type,
        timer: 1000,
        placement: {
          from: from,
          align: align
        }
      }
    );
  }
}

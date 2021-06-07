// Domain name will come from environment variables
// Domain with api endpoint
export const DOMAIN = "http://localhost:8000/";
export const DOMAIN_WITHOUT_TRAILING_SLASH = "http://localhost:8000";
// Api constants
export const API_GET_AUTH_LOGIN: string = DOMAIN + "login/";
export const API_REGISTER: string = DOMAIN + "register/";
export const API_DJNAGO_LOGOUT: string = DOMAIN + "register/";
export const API_GET_PRODUCT_LIST: string = DOMAIN + "get_product_list/";
export const API_CREATE_PRODUCT: string = DOMAIN + "create_product/";
export const API_UPDATE_PRODUCT: string = DOMAIN + "update_product/";
export const API_RETRIEVE_PRODUCT: string = DOMAIN + "retrieve_product/";
export const API_DELETE_PRODUCT: string = DOMAIN + "delete_product/";
export const API_UPLOAD_PICTURE_PRODUCT: string =
  DOMAIN + "upload_product_image/";

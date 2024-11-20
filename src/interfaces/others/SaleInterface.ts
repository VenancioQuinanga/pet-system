import { ProductInterface } from "./ProductInterface"

export interface SaleInterface {
  id?: any,
  fk_payment_type?: number,
  fk_user?: number,
  fk_client?: number,
  products?: ProductInterface[],
  tot_to_pay?: number,
  payment?: number,
  change?: number,
  date?:any,
}

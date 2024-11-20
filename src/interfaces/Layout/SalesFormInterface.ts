import { SaleInterface } from "../others/SaleInterface"

export interface SalesFormInterface {
  onHandleSubmit: any,
  onCancelSale: Function,
  onAddProduct: Function,
  onHandleChange: Function,
  onChangeProducts: Function,
  paymentTypes: any
  getedProducts: any,
  getedClients: any,
  sale: SaleInterface
}

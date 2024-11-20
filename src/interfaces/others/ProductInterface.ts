import { StockInterface } from "./StockInterface"

type SubProduct = {
  id: any,
  description: string
}

export interface ProductInterface {
  id?: any,
  name?: String,
  purchase_price?: number,
  price?: any,
  quantity?: number,
  tb_subProduct?: SubProduct
  tb_stock?: StockInterface,
  fk_family?: any,
  fk_type?: any,
  fk_provisioner?: any,
  fk_subProduct?: number
}

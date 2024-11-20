import { TelephoneInterface } from "./TelephoneInterface"
import { AddressInterface } from "./AddressInterface"

export interface ClientInterface {
  id?: any,
  name?: string,
  email?:string,
  tb_telephone?: TelephoneInterface,
  tb_address?: AddressInterface,
  fk_gender?: any,
  fk_telephone?: any,
  fk_address?: any,
  gender?: any,
  token?: string | undefined,
  length?: any
}

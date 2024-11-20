import { TelephoneInterface } from "./TelephoneInterface"
import { AddressInterface } from "./AddressInterface"

export interface UserInterface {
  id?: any,
  name?: string,
  email?:string,
  password?: string,
  birth_date?: string,
  function?: string,
  category?: any,
  tb_telephone?: TelephoneInterface,
  tb_address?: AddressInterface,
  telephone?: number,
  neighborhood?: string,
  street?: string,
  house?: string
  fk_gender?: any,
  fk_category?: any,
  fk_telephone?: any,
  fk_address?: any,
  gender?: any,
  token?: string | undefined,
  length?: any
}

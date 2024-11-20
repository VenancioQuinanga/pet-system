import { TelephoneInterface } from "./TelephoneInterface"
import { AddressInterface } from "./AddressInterface"

export interface ProvisionerInterface {
  id?: any,
  name?: string,
  email?: string,
  tb_telephone?: TelephoneInterface,
  tb_address?: AddressInterface,
  fk_telephone?: number
}

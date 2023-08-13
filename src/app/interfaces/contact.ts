import { Address } from "./address";

export interface Contact {
    user_id?: number,
    id: number,
    name: string,
    cpf: string,
    phone: string,
    address_attributes: Address
}

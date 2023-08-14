import { Coordinate } from "./coordinate"

export interface Address {
    id?: number,
    street: string,
    number: string,
    complement?: string,
    neighborhood: string,
    zip_code: string,
    city: string,
    uf: string,
    coordinate_attributes: Coordinate
}
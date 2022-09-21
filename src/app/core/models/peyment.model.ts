import { passengersModel } from "./passengers.model";

export interface peymentModel {
    id: number | null,
    price: number | null,
    passengers: passengersModel[]
}
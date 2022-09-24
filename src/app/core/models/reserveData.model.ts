import { passengersModel } from "./passengers.model";

export interface reserveDataModel {
    id: number | null,
    source: string | null,
    destination: string | null,
    price: number | null,
    airline: string | null,
    flightNumber: number | null
    date?: Date | null,
    time: Date | null,
    passengers: passengersModel[];
}
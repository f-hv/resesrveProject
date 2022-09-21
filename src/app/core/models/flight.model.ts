import { Time } from "@angular/common";

export interface FlightModel {
        id: number | null,
        source: string | null,
        destination: string | null,
        airline: string | null,
        date: Date | null,
        time?: Time | null,
        flightNumber: number | null,
        price: number | null,
        deleted: number | null,
}
export interface FlightModel {
        id: number|null,
        source: string|null,
        distination: string|null,
        price: number|null,
        airline: string|null,
        date: Date|null,
        // time:Date|null
        deleted:number|null,
        flightNumber:number|null
}
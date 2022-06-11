export interface reserveDataModel {
    id: number | null,
    source: string | null,
    destination: string | null,
    price: number | null,
    airline: string | null,
    flightNumber: number | null
    loadWeight: number | null,
    date?: Date | null,
    priceClass: string|null,
}
import { Injectable } from '@angular/core';
import { FlightModel } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flight: FlightModel[] = [];
  orginalListFlight=[...this.flight]
  constructor() { }

  getById(id: any) {
    return this.flight.find((item: any) => item.id === id)
  }

  getData() {
    return this.flight;
  }

  edit(data: FlightModel) {
    const editItem = this.flight.find(item => item.id === data.id)
  }

  delete(id: any) {
    this.flight = this.flight.filter(item => item.id === id)
  }

  addFlight(item: FlightModel) {
    this.flight.push({
      id: this.flight.length + 1,
      source: item.source,
      distination: item.distination,
      price: item.price,
      idAirline: item.idAirline,
      date: item.date,
      backFlightId: item.backFlightId
    })
  }

  getOrginalList(){
    return this.orginalListFlight
  }

}

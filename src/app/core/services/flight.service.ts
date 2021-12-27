import { Injectable } from '@angular/core';
import { FlightModel } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flight: FlightModel[] = [
    {
      id: 1,
      source: 'کیش',
      distination: 'تهران',
      price: 50,
      airlineId: 5,
      date: new Date(),
      backFlightId: 0,
      flightNumber:6030,
      deleted: 0
    }
  ];
  orginalListFlight = [...this.flight]
  constructor() { }

  getById(id: any) {
    const findItem = this.flight.find((item: any) => item.id === id);
    if (findItem) return findItem;
    else {
      return { 
        id: null,
        source:null,
        distination:null,
        price:null,
        airlineId:null,
        date: null,
        backFlightId:null,
        flightNumber:null,
        deleted: null
      };
    }
  }

    getData() {
      return this.flight;
    }

    update(data: FlightModel) {
      const editItem = this.flight.find(item => item.id === data.id)
      if (editItem) {
        editItem.source = data.source,
          editItem.distination = data.distination,
          editItem.price = data.price,
          editItem.airlineId = data.airlineId,
          editItem.date = data.date,
          editItem.backFlightId = data.backFlightId,
          editItem.flightNumber=data.flightNumber,
          editItem.deleted = 0
        return true;
      } else return false;
    }

    delete (id: any) {
      const delItem = this.flight.find((item) => item.id === id);
      this.flight = this.flight.filter(item => item.id !== id)
      if (delItem) return true;
      else return false;
    }

    create(item: FlightModel) {
      this.flight.push({
        id: this.flight.length + 1,
        source: item.source,
        distination: item.distination,
        price: item.price,
        airlineId: item.airlineId,
        date: item.date,
        backFlightId: item.backFlightId,
        flightNumber:item.flightNumber,
        deleted: 0,
      })
    }

    getOrginalList(){
      return this.orginalListFlight
    }

  }

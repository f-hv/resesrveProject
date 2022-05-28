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
      airline: 'کیش ایر',
      date: new Date(1400, 11, 5, 10, 33, 30),
      // time:new Date(),
      flightNumber: 6030,
      deleted: 0
    },
    {
      id: 2,
      source: 'اصفهان',
      distination: 'شیراز',
      price: 200,
      airline: 'ایران ایر',
      date: new Date(),
      // time:new Date(),
      flightNumber: 6050,
      deleted: 0
    },
    {
      id: 3,
      source: 'کیش',
      distination: 'تهران',
      price: 50,
      airline: 'کیش ایر',
      date: new Date(),
      // time:new Date(),
      flightNumber: 6030,
      deleted: 0
    },
    {
      id: 4,
      source: 'تهران',
      distination: 'مازندران',
      price: 200,
      airline: 'وارش ',
      date: new Date(),
      // time:new Date(),
      flightNumber: 6050,
      deleted: 0
    },
    {
      id: 5,
      source: 'کیش',
      distination: 'تهران',
      price: 50,
      airline: 'کیش ایر',
      date: new Date(),
      // time:new Date(),
      flightNumber: 6030,
      deleted: 0
    },
    {
      id: 6,
      source: 'مازندران',
      distination: 'شیراز',
      price: 200,
      airline: 'وارش',
      date: new Date(),
      // time:new Date(),
      flightNumber: 6050,
      deleted: 0
    }
  ];
  orginalListFlight = [...this.flight];
  resualt:Boolean=false;
  constructor() { }

  getById(id: any) {
    const findItem = this.flight.find((item: any) => item.id === id);
    if (findItem) return findItem;
    else {
      return {
        id: null,
        source: null,
        distination: null,
        price: null,
        airline: null,
        date: null,
        // time:null,
        flightNumber: null,
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
        editItem.airline = data.airline,
        editItem.date = data.date,
        // editItem.time=data.time,
        editItem.flightNumber = data.flightNumber,
        editItem.deleted = 0
      return true;
    } else return false;
  }

  delete(id: any) {
    const delItem = this.flight.find((item) => {
      if (item.id === id)
        item.deleted = 1;
        this.resualt=true;

    });
    if (this.resualt) return true;
    else return false;
  }

  create(item: FlightModel) {
    this.flight.push({
      id: this.flight.length + 1,
      source: item.source,
      distination: item.distination,
      price: item.price,
      airline: item.airline,
      date: item.date,
      // time:item.time,
      flightNumber: item.flightNumber,
      deleted: 0,
    })
  }

  getOrginalList() {
    return this.orginalListFlight
  }

}

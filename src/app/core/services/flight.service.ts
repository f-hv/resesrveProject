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
      destination: 'تهران',
      price: 50,
      airline: 'ایران ایر',
      date: new Date(1400, 11, 5, 10, 33, 30),
      // time:new Date(),
      flightNumber: 512,
      deleted: 0
    },
    {
      id: 2,
      source: 'اصفهان',
      destination: 'شیراز',
      price: 200,
      airline: 'ایران ایر',
      date: new Date(),
      // time:new Date(),
      flightNumber: 344,
      deleted: 0
    },
    {
      id: 3,
      source: 'شیراز',
      destination: 'اصفهان',
      price: 200,
      airline: 'آتا',
      date: new Date(),
      // time:new Date(),
      flightNumber: 434,
      deleted: 0
    },
    {
      id: 4,
      source: 'کیش',
      destination: 'تهران',
      price: 50,
      airline: 'کیش ایر',
      date: new Date(),
      // time:new Date(),
      flightNumber: 512,
      deleted: 0
    },
    {
      id: 5,
      source: 'تهران',
      destination: 'مازندران',
      price: 200,
      airline: 'وارش ',
      date: new Date(),
      // time:new Date(),
      flightNumber: 176,
      deleted: 0
    },
    {
      id: 6,
      source: 'تهران',
      destination: 'کیش',
      price: 200,
      airline: 'ایران ایر',
      date: new Date(),
      // time:new Date(),
      flightNumber: 152,
      deleted: 0
    },
    {
      id: 7,
      source: 'تهران',
      destination: 'کیش',
      price: 200,
      airline: 'آسمان',
      date: new Date(),
      // time:new Date(),
      flightNumber: 153,
      deleted: 0
    },
    {
      id:8 ,
      source: 'تهران',
      destination: 'کیش',
      price: 200,
      airline: 'آتا',
      date: new Date(),
      // time:new Date(),
      flightNumber: 154,
      deleted: 0
    },
    {
      id: 9,
      source: 'مشهد',
      destination: 'تهران',
      price: 50,
      airline: 'ایراان ایر',
      date: new Date(),
      // time:new Date(),
      flightNumber: 122,
      deleted: 0
    },
    {
      id: 10,
      source: 'تهران',
      destination: 'مشهد',
      price: 200,
      airline: 'آتا',
      date: new Date(),
      // time:new Date(),
      flightNumber: 124,
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
        destination: null,
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
        editItem.destination = data.destination,
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
      destination: item.destination,
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

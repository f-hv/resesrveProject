import { Injectable } from '@angular/core';
import { FlightModel } from '../models/flight.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  flight: FlightModel[] = [];
  orginalListFlight = [...this.flight];
  resualt: Boolean = false;
  stringList: any;
  constructor(
    private localStorageService: LocalStorageService
  ) { }

  getById(id: any) {
    this.getData();
    const findItem = this.flight.find((item: any) => item.id === id);
    return findItem ? findItem : {
      id: null,
      source: null,
      destination: null,
      airline: null,
      date: null,
      time: null,
      flightNumber: null,
      price:null,
      deleted: null
    };
  }

  getData() {
    return this.stringList = JSON.parse(LocalStorageService.read("flights"));
  }
  create(data: FlightModel) {   
    this.flight = JSON.parse(LocalStorageService.read("flights"));
    if (this.flight == null) {
      data.id = 1;
      const list: FlightModel[] = [];
      list.push(data);
      LocalStorageService.save("flights", JSON.stringify(list));
      return true
    }
    else {
      data.id = this.flight.length + 1;
      const validUser = this.flight.find((item: any) => item.source === data.source && item.destination === data.destination && item.date === data.date && item.time === data.time)
      return validUser ? this.update(data) && true : LocalStorageService.addToArray("flights", data) && true;
    }
  }

  update(data: FlightModel) {
    this.getData();
    this.flight.find((item: any) => {
      if (item.id === data.id) {
        item.source = data.source,
          item.destination = data.destination,
          item.airline = data.airline,
          item.date = data.date,
          item.time = data.time,
          item.price =data.price,
          item.flightNumber = data.flightNumber,
          item.deleted = 0
        LocalStorageService.save("flights", JSON.stringify(this.flight));
        this.resualt = true;
      }
    })
    return this.resualt ? true : false;
  }

  delete(id: any) {
    this.getData()
    this.flight = this.flight.filter((item) => {
      if (item.id === id) {
        item.deleted = 1;
        this.resualt = true;
      }
      LocalStorageService.save("flights", JSON.stringify(this.flight));
    });
    return this.resualt ? true : false;
  }



  getOrginalList() {
    return this.orginalListFlight
  }

}

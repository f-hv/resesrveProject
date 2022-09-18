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
      deleted: null
    };
  }

  getData() {
    debugger
    let data = LocalStorageService.read("flights");
    let A1 = JSON.parse(data);
    console.log("A1",A1);
    console.log("data",data);
  
    
    try{
      return A1;
    }catch (e) {
      return data;
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

  create(data: FlightModel) {
    this.flight =JSON.parse( LocalStorageService.read("flights"));
    if (this.flight==null) {
      const list:FlightModel[]=[];
      list.push(data);
      LocalStorageService.save("flights", JSON.stringify(list));
      return true
    }
    else {
      const validUser = this.flight.find((item: any) => item.source === data.source && item.destination === data.destination)
      return validUser ? false : LocalStorageService.addToArray("flights",data) && true;
    }
  }

  getOrginalList() {
    return this.orginalListFlight
  }

}

import { Injectable } from '@angular/core';
import { AirlineModel } from '../models/airline.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  airline: AirlineModel[] = [];
  orginalListAirline = [...this.airline];
  resualt: Boolean = false;

  constructor() { }

  getById(id: any) {
    this.getData();
    const findItem = this.airline.find((item: any) => item.id === id);
    return findItem ?  findItem :{id: null,name: null,city: null,loadWeight: null,deleted: null };
  }

  getData() {
    return this.airline = JSON.parse(LocalStorageService.read("airlines"));
  }
  create(data: AirlineModel) {
    this.airline = JSON.parse(LocalStorageService.read("airlines"));
    if (this.airline == null) {
      const list: AirlineModel[] = [];
      data.id = 1;
      list.push(data);
      LocalStorageService.save("airlines", JSON.stringify(list));
      return true
    }
    else {
      data.id = this.airline.length + 1;
      const validUser = this.airline.find((item: any) => item.name === data.name && item.city === data.city)
      return validUser ? this.update(data) && true : LocalStorageService.addToArray("airlines", data) && true;
    }
  }

  update(data: AirlineModel) {
    debugger
    this.getData();
    this.airline.find((item: any) => {
      if (item.id === data.id || item.name === data.name) {
        item.name = data.name,
        item.city = data.city,
        item.deleted = 0
        LocalStorageService.save("airlines", JSON.stringify(this.airline));
        this.resualt = true;
      }
    })
    return this.resualt ? true : false;
  }

  delete(id: any) {
    this.getData()
    this.airline = this.airline.filter((item) => {
      if (item.id === id) {
        item.deleted = 1;
        this.resualt = true;
      }
      LocalStorageService.save("airlines", JSON.stringify(this.airline));
    });
    return this.resualt ? true : false;
  }

  getOrginalList() {
    return this.orginalListAirline;
  }

}

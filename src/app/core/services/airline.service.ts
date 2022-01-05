import { Injectable } from '@angular/core';
import { AirlineModel } from '../models/airline.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  airline: AirlineModel[] = [
    {
      id: 1,
      name: 'کیش ایر',
      city: 'کیش',
      priceClass: 'H',
      loadWeight: 20,
      deleted: 0
    }
  ];
  orginalListAirline = [...this.airline];

  constructor() { }

  getById(id: any) {
    const findItem = this.airline.find((item: any) => item.id === id);
    if (findItem) return findItem;
    else {
      return {
        id: null,
        name: null,
        city: null,
        priceClass: null,
        loadWeight: null,
        deleted: null
      };
    }
  }

  getData() {
    return this.airline;
  }

  update(data: AirlineModel) {
    const editItem = this.airline.find(item => item.id === data.id)
    if (editItem) {
      editItem.name = data.name,
        editItem.city = data.city,
        editItem.priceClass = data.priceClass,
        editItem.loadWeight = data.loadWeight,
        editItem.deleted = 0
      return true;
    } else return false;
  }

  delete(id: any) {
    const delItem = this.airline.find((item) => item.id === id);
    this.airline = this.airline.filter(item => item.id !== id);
    if (delItem) return true;
    else return false;
  }

  create(data: AirlineModel) {
    this.airline.push({
      id: this.airline.length + 1,
      name: data.name,
      city: data.city,
      priceClass: data.priceClass,
      loadWeight: data.loadWeight,
      deleted: 0
    })
  }

  getOrginalList() {
    return this.orginalListAirline;
  }

}

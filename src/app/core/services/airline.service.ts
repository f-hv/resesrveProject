import { Injectable } from '@angular/core';
import { AirlineModel } from '../models/airline.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  airline:AirlineModel[]=[];
  orginalListAirline=[...this.airline];

  constructor() { }

  getById(id: any) {
    return this.airline.find((item: any) => item.id === id)
  }

  getData() {
    return this.airline;
  }

  edit(data: AirlineModel) {
    const editItem = this.airline.find(item => item.id === data.id)
  }

  delete(id: any) {
    this.airline = this.airline.filter(item => item.id === id)
  }

  addairline(data: AirlineModel) {
    this.airline.push({
      id: this.airline.length + 1,
      name:data.name,
      city: data.city,
      priceClass: data.priceClass,
      loadWeight: data.loadWeight,
    })
  }

  getOrginalList(){
    return this.orginalListAirline;
  }
  
}

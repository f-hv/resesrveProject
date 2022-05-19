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
    },
    {
      id: 2,
      name: 'ایران ایر',
      city: 'تهران',
      priceClass: 'G',
      loadWeight: 30,
      deleted: 0
    },
    {
      id: 3,
      name: 'آسمان',
      city: 'تهران',
      priceClass: 'H',
      loadWeight: 20,
      deleted: 0
    },
    {
      id: 4,
      name: 'آتا',
      city: 'تبریز',
      priceClass: 'G',
      loadWeight: 30,
      deleted: 0
    },
    {
      id: 5,
      name: 'کاسپین',
      city: 'کیش',
      priceClass: 'H',
      loadWeight: 20,
      deleted: 0
    },
    {
      id: 6,
      name: 'وارش',
      city: 'مازندران',
      priceClass: 'G',
      loadWeight: 30,
      deleted: 0
    },
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
    const delItem = this.airline.find((item) =>{ 
     if( item.id === id)
      item.deleted=1;
    });
    // this.airline = this.airline.filter(item => item.id !== id);
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

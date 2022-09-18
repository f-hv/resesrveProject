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
      loadWeight: 20,
      deleted: 0
    },
    {
      id: 2,
      name: 'ایران ایر',
      city: 'تهران',
      loadWeight: 30,
      deleted: 0
    },
    {
      id: 3,
      name: 'آسمان',
      city: 'تهران',
      loadWeight: 20,
      deleted: 0
    },
    {
      id: 4,
      name: 'آتا',
      city: 'تبریز',
      loadWeight: 30,
      deleted: 0
    },
    {
      id: 5,
      name: 'کاسپین',
      city: 'کیش',
      loadWeight: 20,
      deleted: 0
    },
    {
      id: 6,
      name: 'وارش',
      city: 'مازندران',
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
    if (delItem) return true;
    else return false;
  }

  create(data: AirlineModel) {
    this.airline.push({
      id: this.airline.length + 1,
      name: data.name,
      city: data.city,
      loadWeight: data.loadWeight,
      deleted: 0
    })
  }

  getOrginalList() {
    return this.orginalListAirline;
  }

}

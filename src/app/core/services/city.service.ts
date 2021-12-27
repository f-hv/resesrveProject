import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  city: CityModel[] = [
    { id: 1, name: 'neyshabour',deleted:0 },
    { id: 2, name: 'mashhad',deleted:0 },
  ];
  orginalListCity = [...this.city];

  constructor() {}

  getById(id: any) {
    const findItem = this.city.find((item: any) => item.id === id);
    if (findItem) return findItem;
    else {
      return { id: null, name: null,deleted:null };
    }
  }

  getData() {
    return this.city;
  }

  update(data: any) {
    debugger
    const editItem = this.city.find((item) => item.id === data.id);
    if (editItem) {
      editItem.name = data.name;
      return true;
    } else return false;
  }

  delete(id: any) {
    const delItem = this.city.find((item) => item.id === id);
    this.city = this.city.filter((item) => item.id !== id);
    if (delItem) return true;
    else return false;
  }

  create(data: CityModel) {
    debugger
    this.city.push({
      id: this.city.length + 1,
      name: data.name,
      deleted:0
    });
  }

  getOrginalList() {
    return this.orginalListCity;
  }
}

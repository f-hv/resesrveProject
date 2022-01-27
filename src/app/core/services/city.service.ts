import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  city: CityModel[] = [
    { id: 1, name: 'مشهد',deleted:0 },
    { id: 2, name: 'تهران',deleted:0 },
    { id: 3, name: 'اصفهان',deleted:0 },
    { id: 4, name: 'شیراز',deleted:0 },
    { id: 5, name: 'کیش',deleted:0 },
    { id:6, name: 'تبریز',deleted:0 },
    { id: 7, name: 'سبزوار',deleted:0 }
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

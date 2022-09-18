import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  city: CityModel[] = [
    { id: 1, name: 'ارک', deleted: 0 },
    { id: 2, name: 'اردبیل', deleted: 0 },
    { id: 3, name: 'ارومیه', deleted: 0 },
    { id: 4, name: 'اصفهان', deleted: 0 },
    { id: 5, name: 'اهواز', deleted: 0 },
    { id: 5, name: 'ایلام', deleted: 0 },
    { id: 6, name: 'بجنورد', deleted: 0 },
    { id: 7, name: 'بندرعباس', deleted: 0 },
    { id: 8, name: 'بوشهر', deleted: 0 },
    { id: 9, name: 'بیرجند', deleted: 0 },
    { id: 10, name: 'تبریز', deleted: 0 },
    { id: 11, name: 'تهران', deleted: 0 },
    { id: 12, name: 'خرم آباد', deleted: 0 },
    { id: 13, name: 'رشت', deleted: 0 },
    { id: 14, name: 'زاهدان', deleted: 0 },
    { id: 15, name: 'زنجان', deleted: 0 },
    { id: 16, name: 'ساری', deleted: 0 },
    { id: 17, name: 'سمنان', deleted: 0 },
    { id: 18, name: 'سنندج', deleted: 0 },
    { id: 19, name: 'شهرکرد', deleted: 0 },
    { id: 20, name: 'شیراز', deleted: 0 },
    { id: 21, name: 'قزوین', deleted: 0 },
    { id: 22, name: 'قم', deleted: 0 },
    { id: 23, name: 'کرج', deleted: 0 },
    { id: 24, name: 'کرمان', deleted: 0 },
    { id: 25, name: 'کرمانشاه', deleted: 0 },
    { id: 26, name: 'کیش', deleted: 0 },
    { id: 27, name: 'گرگان', deleted: 0 },
    { id: 28, name: 'مشهد', deleted: 0 },
    { id: 29, name: 'همدان', deleted: 0 },
    { id: 30, name: 'یتسوج', deleted: 0 },
    { id: 31, name: 'یزد', deleted: 0 },
  ];
  
  constructor() { }

  getById(id: any) {
    const findItem = this.city.find((item: any) => item.id === id);
    return findItem ? findItem : { id: null, name: null, deleted: null };
  }
  getData() {
    return this.city;
  }
}

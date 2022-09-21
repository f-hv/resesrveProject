import { Injectable } from '@angular/core';
import { peymentModel } from '../models/peyment.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PeymentService {
  peymentList:peymentModel[];
  constructor() { }

  getById(id: any) {
    this.getData();
    const findItem = this.peymentList.find((item: any) => item.id === id)
    return findItem ? findItem : { id: null, price: null, passengers: [] };
  }

  getData() {
    return this.peymentList = JSON.parse(LocalStorageService.read("peymentList"));
  }

  addPeyment(data: any) {
    debugger
    this.getData();
    if (this.peymentList == null) {
      data.id = 1;
      const list: peymentModel[] = [];
      list.push(data);
      LocalStorageService.save("peyment", JSON.stringify(list));
      return data.id
    }
    else {
      data.id = this.peymentList.length + 1;
      return LocalStorageService.addToArray("peyment", data) && data.id ;
    }
  }
}

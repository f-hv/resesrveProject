import { Injectable } from '@angular/core';
import { peymentModel } from '../models/peyment.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PeymentService {
  peymentList: peymentModel[];
  constructor() { }

  getById(id: any) {
    this.getData();
    const findItem = this.peymentList.find((item: any) => item.id === id)
    return findItem ? findItem : { id: null, price: null, passengers: [] };
  }

  getData() {
    return this.peymentList = JSON.parse(LocalStorageService.read("peyment"));
  }

  addPeyment(data: any) {
     
    this.getData();
    this.peymentList == null ? LocalStorageService.save("peyment", JSON.stringify(data)) : LocalStorageService.addToArray("peyment", data);
    return true;
  }
}

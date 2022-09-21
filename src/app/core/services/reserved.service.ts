import { Injectable } from '@angular/core';
import { ReservedModel } from '../models/reserved.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReservedService {
  Reserved: ReservedModel[] = [];
  constructor() { }

  getByflightId(id: any) {
    this.getData();
    const findItem = this.Reserved.find((item: any) => item.flightId === id);
    return findItem ? findItem : { id: null, flightId: null, userId: null, };
  }

  getById(id: any) {
    this.getData();
    const findItem = this.Reserved.find((item: any) => item.id === id)
    return findItem ? findItem : { id: null, flightId: null, userId: null, };
  }

  getData() {
    return this.Reserved = JSON.parse(LocalStorageService.read("reserved"));
  }

  addReserved(data: ReservedModel) {
    this.getData();
    if (this.Reserved == null) {
      data.id = 1;
      const list: ReservedModel[] = [];
      list.push(data);
      LocalStorageService.save("reserved", JSON.stringify(list));
      return true
    }
    else {
      data.id = this.Reserved.length + 1;
      return LocalStorageService.addToArray("reserved", data) && true;
    }
  }
  // update(data: ReservedModel) {
  //   const editItem = this.Reserved.find(item => item.id === data.id)
  // }

  // delete(id: any) {
  //   this.Reserved = this.Reserved.filter(item => item.id === id)
  // }


}

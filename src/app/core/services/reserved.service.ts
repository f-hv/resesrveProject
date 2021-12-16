import { Injectable } from '@angular/core';
import { ReservedModel } from '../models/reserved.model';

@Injectable({
  providedIn: 'root'
})
export class ReservedService {
  Reserved:ReservedModel[]=[];
  orginalListReserved=[...this.Reserved];

  constructor() { }

  getById(id: any) {
    return this.Reserved.find((item: any) => item.id === id)
  }

  getData() {
    return this.Reserved;
  }

  edit(data: ReservedModel) {
    const editItem = this.Reserved.find(item => item.id === data.id)
  }

  delete(id: any) {
    this.Reserved = this.Reserved.filter(item => item.id === id)
  }

  addReserved(data: ReservedModel) {
    this.Reserved.push({
      id:this.Reserved.length+1,
      flightId:data.flightId,
      userId:data.userId,
      paymentId:data.paymentId
    })
  }

  getOrginalList(){
    return this.orginalListReserved;
  }
}

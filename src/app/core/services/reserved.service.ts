import { Injectable } from '@angular/core';
import { ReservedModel } from '../models/reserved.model';

@Injectable({
  providedIn: 'root'
})
export class ReservedService {
  Reserved: ReservedModel[] = [
    {
      id: 1,
      flightId: 512,
      BackFlightId: 0,
      paymentId: 501,
      userId: 2,
      emptySeats: 20,
    },
    {
      id: 2,
      flightId: 512,
      BackFlightId: 152,
      paymentId: 501,
      userId: 3,
      emptySeats: 10,
    },
    {
      id: 3,
      flightId: 152,
      BackFlightId: 512,
      paymentId: 501,
      userId: 2,
      emptySeats: 50,
    },
    {
      id: 4,
      flightId: 153,
      BackFlightId: 0,
      paymentId: 501,
      userId: 3,
      emptySeats: 2,
    },
    {
      id: 5,
      flightId: 122,
      BackFlightId: 0,
      paymentId: 501,
      userId: 2,
      emptySeats: 49,
    },
  ];
  orginalListReserved = [...this.Reserved];

  constructor() { }

  getByflightId(id: any) {
    return this.Reserved.find((item:any) => item.flightId === id);
  }
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
      id: this.Reserved.length + 1,
      flightId: data.flightId,
      userId: data.userId,
      paymentId: data.paymentId,
      emptySeats: Number(data.emptySeats) - 1,
      BackFlightId: data.BackFlightId
    })
  }
  getOrginalList() {
    return this.orginalListReserved;
  }
}

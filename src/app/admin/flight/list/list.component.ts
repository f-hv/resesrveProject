import { Component, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/core/models/flight.model';
import { FlightService } from 'src/app/core/services/flight.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listFlight: FlightModel[] = [];

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.listFlight = this.flightService.getData();
    this.listFlight = this.listFlight.filter(item => item.deleted === 0)
  }
  delete(item: any) {
    const resualt = this.flightService.delete(item);
    if (resualt)
      console.log("delete succesfull");
    else
      console.log("fail deleted");
    this.getData();
  }
  flightById(index: any, flight: any) {
    return flight.id
  }
}

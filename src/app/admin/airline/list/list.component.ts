import { Component, OnInit } from '@angular/core';
import { AirlineModel } from '../../../core/models/airline.model';
import { AirlineService } from '../../../core/services/airline.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listAirline: AirlineModel[];
  constructor(
    private airlineService: AirlineService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.listAirline = this.airlineService.getData();
    this.listAirline=this.listAirline.filter(item => item.deleted === 0)
  }
  delete(item: any) {
    const resualt = this.airlineService.delete(item);
    if (resualt)
      console.log("delete succesfull");
    else
      console.log("fail deleted");
    this.getData();
  }
  airlineById(index: any, flight: any) {
    return flight.id;
  }

}

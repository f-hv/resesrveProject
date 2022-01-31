import { Component, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/core/models/flight.model';
import { FlightService } from 'src/app/core/services/flight.service';
import * as moment from "jalali-moment";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listFlight: FlightModel[] = [];
  searchKeyWord: any;
  ///// pagination
  currentPage :any =1;
  elementPerpage = 5;
  collectionSize: number;
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.listFlight = this.flightService.getData();
    this.listFlight = this.listFlight.filter(item => item.deleted === 0);
    this.collectionSize = this.listFlight.length;
    // moment().locale('fa').format('YYYY/M/D');

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
    return flight.id;
  }

  onKeyup(item: any) {
    if (item.keycode !== 13 || item.keycode !== 8) {
      this.searchKeyWord = item;
    }
    if (this.searchKeyWord.length === 0) {
      this.listFlight = this.flightService.getOrginalList();
    }
    if (this.searchKeyWord.length > 1) {
      if (item.keycode !== 13 || item.keycode !== 8) {
        this.getData();
        this.listFlight = this.listFlight.filter(flight =>
          flight.source?.includes(item) ||
          flight.distination?.includes(item) ||
          flight.airline?.includes(item)||
          flight.price == item
        );
      }
    }
  }
}
function input(input: any, arg1: string) {
  throw new Error('Function not implemented.');
}


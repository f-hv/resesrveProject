import { Component, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/core/models/flight.model';
import { FlightService } from 'src/app/core/services/flight.service';
import { ToastrService } from 'ngx-toastr';


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
  constructor(
    private flightService: FlightService,
    private toastrService:ToastrService

    ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.listFlight = this.flightService.getData();
    this.listFlight = this.listFlight.filter(item => item.deleted === 0);
    console.log(this.listFlight);
    
    this.collectionSize = this.listFlight.length;
    // moment().locale('fa').format('YYYY/M/D');

  }
  delete(item: any) {
    const resualt = this.flightService.delete(item);
    if (resualt)
      this.toastrService.success('delete succesfull');
    else
      this.toastrService.warning('fail deleted');
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
          flight.destination?.includes(item) ||
          flight.airline?.includes(item)
        );
      }
    }
  }
}
function input(input: any, arg1: string) {
  throw new Error('Function not implemented.');
}


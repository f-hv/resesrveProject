import { Component, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/core/models/flight.model';
import { FlightService } from 'src/app/core/services/flight.service';
import { ToastrService } from 'ngx-toastr';
import { AirlineService } from 'src/app/core/services/airline.service';
import { CityService } from 'src/app/core/services/city.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listFlight: FlightModel[] = [];
  flightData: any[] = [];
  searchKeyWord: any;
  ///// pagination
  currentPage: any = 1;
  elementPerpage = 7;
  collectionSize: number;
  constructor(
    private toastrService: ToastrService,
    private flightService: FlightService,
    private airlineService: AirlineService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
     
    const data = this.flightService.getData();
    this.listFlight = data.filter((item: any) => item.deleted == 0);
    this.listFlight.map((item: any) => {
      const source = this.cityService.getById(item.source);
      const destination = this.cityService.getById(item.destination);
      const airline = this.airlineService.getById(item.airline);
      item.source = source.name,
      item.destination = destination.name,
      item.airline = airline.name,
      item.flightNumber = item.flightNumber,
      item.time = item.time,
      item.date = item.date,
      item.price = item.price
    })
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
    (item.keycode !== 13 || item.keycode !== 8) ? this.searchKeyWord = item : '';
    this.searchKeyWord.length === 0 ? this.listFlight = this.flightService.getOrginalList() : '';
    if (this.searchKeyWord.length > 1 && (item.keycode !== 13 || item.keycode !== 8)) {
      this.getData();
      this.listFlight = this.listFlight.filter(flight =>
        flight.source?.includes(item) ||
        flight.destination?.includes(item) ||
        flight.airline?.includes(item)
      );
    }
  }
}
function input(input: any, arg1: string) {
  throw new Error('Function not implemented.');
}


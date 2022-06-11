import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightModel } from 'src/app/core/models/flight.model';
import { AirlineService } from 'src/app/core/services/airline.service';
import { FlightService } from 'src/app/core/services/flight.service';
import { ReservedService } from 'src/app/core/services/reserved.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() twoWay: Boolean;
  listFlight: FlightModel[];
  searchResualt: any[] = [];
  destination: any;
  listR: any;
  source: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private flightService: FlightService,
    private airlineService: AirlineService,
    private reservedService: ReservedService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    /////
    this.listR = this.reservedService.getData();
    /////
    const prams = this.activatedRoute.snapshot.paramMap;
    this.destination = prams.get('destination');
    this.source = prams.get('source');
    this.listFlight = this.flightService.getData();
    const airlineResualt = this.airlineService.getData();
    this.listFlight.map((item) => {
      if (item.source == this.source && item.destination === this.destination && item.deleted === 0) {
        let dataReserved = this.reservedService.getByflightId(item.flightNumber);
        if (dataReserved) {
          airlineResualt.find((line: any) => {
            if (line.name === item.airline) {
              this.searchResualt.push({
                price: item.price,
                date: item.date,
                flightNumber: item.flightNumber,
                airline: item.airline,
                loadWeight: line.loadWeight,
                priceClass: line.priceClass,
                emptySeats: dataReserved?.emptySeats
              })
            }
          })
        }
      }
    });
  }
  reserve(reserveInfo: any) {
    if (this.twoWay) {
      ////////
    }
    else {
      const currentUser = this.userService.getParseData("currentUser");
      reserveInfo.userId = currentUser.id;
      reserveInfo.BackFlightId = 0;
      this.reservedService.addReserved(reserveInfo)
    }
  }
}

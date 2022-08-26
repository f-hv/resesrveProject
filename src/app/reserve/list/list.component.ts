import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightModel } from 'src/app/core/models/flight.model';
import { AirlineService } from 'src/app/core/services/airline.service';
import { CityService } from 'src/app/core/services/city.service';
import { FlightService } from 'src/app/core/services/flight.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
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
  listReserved: any;
  departingDate: any;
  detailsOpen: boolean[]=[];
  infoOpen: boolean[]=[];
  params: any
  source: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private flightService: FlightService,
    private airlineService: AirlineService,
    private reservedService: ReservedService,
    private userService: UserService,
    private cityService: CityService,
    private localStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    /////
    this.listReserved = this.reservedService.getData();
    /////
    const params = this.activatedRoute.snapshot.paramMap;
    console.log(params);
    this.departingDate = params.get('departingDate');
    this.destination = params.get('destination');
    this.source = this.cityService.getById(Number(params.get('source')));
    this.destination = this.cityService.getById(Number(params.get('destination')));
    this.listFlight = this.flightService.getData();
    const airlineResualt = this.airlineService.getData();
    this.listFlight.map((item) => {
      if (item.source == this.source.name && item.destination === this.destination.name && item.deleted === 0) {
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
                emptySeats: dataReserved?.emptySeats,
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
      const currentUser = LocalStorageService.read("currentUser");
      reserveInfo.userId = currentUser.id;
      reserveInfo.BackFlightId = 0;
      this.reservedService.addReserved(reserveInfo)
    }
  }
  detailTabOpen(item:any) {
    this.infoOpen[item]=false;
    this.detailsOpen[item] = !this.detailsOpen[item];
  }
  infoTabOpen(item:any) {
    this.detailsOpen[item]=false;
    this.infoOpen[item] = !this.infoOpen[item];
  }
}

import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlightModel } from 'src/app/core/models/flight.model';
import { AirlineService } from 'src/app/core/services/airline.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CityService } from 'src/app/core/services/city.service';
import { FlightService } from 'src/app/core/services/flight.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ReservedService } from 'src/app/core/services/reserved.service';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'jalali-moment'

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
  travelPrice: number;
  adultCount: number;
  childCount: number;
  babyCount: number;
  detailsOpen: boolean[] = [];
  infoOpen: boolean[] = [];
  params: any
  source: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private airlineService: AirlineService,
    private reservedService: ReservedService,
    private cityService: CityService,
    private authService: AuthService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.listReserved = this.reservedService.getData();
    this.activatedRoute.queryParamMap.subscribe(params => this.params = params);
    console.log("list",this.params);
    // this.params = this.activatedRoute.snapshot.paramMap;
    this.departingDate = this.params.get('departingDate');
    this.adultCount = Number(this.params.get('adult'));
    this.childCount = Number(this.params.get('child'));
    this.babyCount = Number(this.params.get('baby'));
    this.TravelPriceCalculation();
    this.source = this.cityService.getById(Number(this.params.get('source')));
    this.destination = this.cityService.getById(Number(this.params.get('destination')));
    this.listFlight = this.flightService.getData();
    const airlineResualt = this.airlineService.getData();
    this.listFlight.map((item) => {
      if (item.source == this.source.name && item.destination === this.destination.name && item.deleted === 0) {
        let dataReserved = this.reservedService.getByflightId(item.flightNumber);
        if (dataReserved) {
          airlineResualt.find((line: any) => {
            if (line.name === item.airline) {
              this.searchResualt.push({
                price: this.travelPrice,
                date:item.date? moment(item.date,'jYY/jM/jD') : '',
                flightNumber: item.flightNumber,
                airline: line,
                loadWeight: line.loadWeight,
              })
            }
          })
        }
      }
    });
  }
  reserve(reserveInfo: any) {
    if (this.authService.isLoggedIn()) {
      if (this.twoWay) {
        ////////
      }
      else {
        const currentUser = JSON.parse(LocalStorageService.read("currentUser"));
        reserveInfo.userId = currentUser.id;
        reserveInfo.BackFlightId = 0;
        this.router.navigate(['reserve/reserveStep'],
          {
            queryParams: {
              'source': this.source.id,
              'destination': this.destination.id,
              'travelMode': Number(this.params.get('travelMode')),
              'date': this.departingDate,
              'adult': this.adultCount,
              'child': this.childCount,
              'baby': this.babyCount,
              'flightNumber': reserveInfo.flightNumber,
              'price': this.travelPrice,
              'airline': reserveInfo.airline.id
            }
          }
        );
      }
    }
    else {
      this.router.navigate(['../login'], {
        relativeTo: this.activatedRoute
      })
    }
  }
  TravelPriceCalculation() {
    this.travelPrice = ((this.adultCount * 900) + (this.childCount * 700) + (this.babyCount * 500)) * 10000;
  }
  detailTabOpen(item: any) {
    this.infoOpen[item] = false;
    this.detailsOpen[item] = !this.detailsOpen[item];
  }
  infoTabOpen(item: any) {
    this.detailsOpen[item] = false;
    this.infoOpen[item] = !this.infoOpen[item];
  }
}

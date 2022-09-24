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
  flightData: any[] = [];
  destination: any;
  listReserved: any;
  departingDate: any;
  travelPrice: any;
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
    private userService:UserService,
    private reservedService: ReservedService,
    private cityService: CityService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    debugger
    this.activatedRoute.queryParamMap.subscribe(params => this.params = params);
    this.departingDate = this.params.get('departingDate');
    this.adultCount = Number(this.params.get('adult'));
    this.childCount = Number(this.params.get('child'));
    this.babyCount = Number(this.params.get('baby'));
    this.source = this.cityService.getById(Number(this.params.get('source')));
    this.destination = this.cityService.getById(Number(this.params.get('destination')));
    this.listFlight = this.flightService.getData();
    const airlineResualt = this.airlineService.getData();
    this.listFlight.map((item) => {
      if (item.source == this.source.id && item.destination === this.destination.id &&
        item.date == this.departingDate && item.deleted === 0) {
        this.TravelPriceCalculation(item.price);
        this.flightData.push({
          id: item.id,
          source: this.source.name,
          destination: this.destination.name,
          airline: this.airlineService.getById(item.airline),
          flightNumber: item.flightNumber,
          time: item.time,
          date: this.departingDate,
          price: this.travelPrice,
        })
      }
    });
  }
  reserve(reserveInfo: any) {
    if (this.authService.isLoggedIn()) {
      const currentUser =this.userService.getData();
      reserveInfo.userId = currentUser.id;
      this.router.navigate(['reserve/reserveStep'],
        {
          queryParams: {
            'source': this.source.id,
            'destination': this.destination.id,
            // 'travelMode': Number(this.params.get('travelMode')),
            'date': this.departingDate,
            'time': reserveInfo.time,
            'adult': this.adultCount,
            'child': this.childCount,
            'baby': this.babyCount,
            'flightNumber': reserveInfo.flightNumber,
            'price': String(reserveInfo.price),
            'airline': reserveInfo.airline.id
          }
        }
      );
    }
    else {
      this.router.navigate(['../login'], {
        relativeTo: this.activatedRoute
      })
    }
  }
  TravelPriceCalculation(price: any) {
    this.travelPrice = ((this.adultCount * price) + (this.childCount * price) + (this.babyCount * price)) * 10000;
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

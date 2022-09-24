import { Component, OnInit } from '@angular/core';
import { passengersModel } from 'src/app/core/models/passengers.model';
import { peymentModel } from 'src/app/core/models/peyment.model';
import { ReservedModel } from 'src/app/core/models/reserved.model';
import { AirlineService } from 'src/app/core/services/airline.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CityService } from 'src/app/core/services/city.service';
import { FlightService } from 'src/app/core/services/flight.service';
import { PeymentService } from 'src/app/core/services/peyment.service';
import { ReservedService } from 'src/app/core/services/reserved.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.scss']
})
export class ReservedComponent implements OnInit {
  listReserved: any[] = [];
  listPeyment: peymentModel[] = [];
  reservedData: ReservedModel[] = [];
  listPassengers: passengersModel[] = [];
  ///// pagination
  currentPage: any = 1;
  elementPerpage = 5;
  collectionSize: number;
  ///// search
  searchKeyWord: any;
  constructor(
    private reservService: ReservedService,
    private peymentService: PeymentService,
    private userService: UserService,
    private flightService: FlightService,
    private cityService: CityService,
    private airlineService: AirlineService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.reservedData = this.reservService.getData();
    this.listPeyment = this.peymentService.getData();
    if (this.reservedData && this.listPeyment) {
      var userIsLoged = this.authService.currentUser$.value;
      this.reservedData.map((reservItem: any) => {
        this.listPeyment.map((peyItem: any) => {
          if (reservItem.peymentId == peyItem.id && reservItem.userId == userIsLoged.id ) {
            const itemUserName = this.userService.getById(reservItem.userId);
            var dataFlight = this.flightService.getById(reservItem.flightId);
            const itemSource = this.cityService.getById(dataFlight.source);
            const itemDestination = this.cityService.getById(dataFlight.destination);
            const itemAirline = this.airlineService.getById(dataFlight.airline)
            this.listReserved.push({
              id: this.listReserved.length + 1,
              userName: itemUserName?.userName,
              source: itemSource.name,
              destination: itemDestination.name,
              price: peyItem.price,
              airline: itemAirline.name,
              date: dataFlight.date,
              time: dataFlight.time,
              flightNumber: reservItem.flightId,
              listPassengers: peyItem.passengers
            })
          }
        })
      })
    }
    this.listPassengers.map((item: any) => {
      if (item.gender == 1)
        item.gender = 'زن'
      else
        item.gender = 'مرد'
    })
  }

  onKeyup(key: any) {
    debugger
    if (key.keycode !== 13 || key.keycode !== 8) {
      this.searchKeyWord = key;
    }
    this.searchKeyWord.length === 0 ? this.listReserved = this.reservService.getData() : '';
    if (this.searchKeyWord.length > 1 && (key.keycode !== 13 || key.keycode !== 8)) {
      this.getData();
      this.listReserved = this.listReserved.filter(flight =>
        flight.flightName?.includes(key) ||
        flight.userName?.includes(key) ||
        flight.source?.includes(key) ||
        flight.destination?.includes(key) ||
        flight.airline?.includes(key) ||
        flight.price?.includes(key)
      );
    }
  }

}

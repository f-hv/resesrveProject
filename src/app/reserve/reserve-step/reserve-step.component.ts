import { Component, Directive, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { genderEnum } from 'src/app/shared/enums/gender.enum';
import { CityService } from 'src/app/core/services/city.service';
import { CityModel } from 'src/app/core/models/city.model';
import { AirlineModel } from 'src/app/core/models/airline.model';
import { AirlineService } from 'src/app/core/services/airline.service';
import { ReservedService } from 'src/app/core/services/reserved.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
import { PeymentService } from 'src/app/core/services/peyment.service';
import { passengersModel } from 'src/app/core/models/passengers.model';
export enum passengerType {
  adult = 1,
  child = 2,
  baby = 3
}
@Component({
  selector: 'app-reserve-step',
  templateUrl: './reserve-step.component.html',
  styleUrls: ['./reserve-step.component.scss']
})

export class ReserveStepComponent implements OnInit {
  passengerType: typeof passengerType = passengerType;
  passengersForm: FormGroup;
  stepper: Stepper;
  reserveData: any = { id: null, flightId: null, userId: null, peymentId: null };
  tripInfo: any;
  isclickOnNext: Boolean = false;
  passengerTitle: string;
  age: string;
  /////// params /////////
  source: CityModel;
  destination: CityModel;
  travelPrice: any = {};
  adultCount: number;
  childCount: number;
  babyCount: number;
  price: number;
  airline: AirlineModel;
  flightNumber: number;
  date: any;
  time: any;
  //// dropdown/////
  // dropdownSettings: IDropdownSettings;
  dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
  };
  Genderlist = [
    { id: 1, name: 'زن' },
    { id: 2, name: ' مرد' },
  ];
  selectedItem: any;
  //////range age //////////
  min: number = 0;
  max: number = 0;
  ///// new Form Control /////
  listPassengersData: passengersModel[];
  ///// pagination
  currentPage: any = 1;
  elementPerpage = 7;
  collectionSize: number;
  constructor(
    private formBuilder: FormBuilder,
    private reservedService: ReservedService,
    private activatedRoute: ActivatedRoute,
    private airlineService: AirlineService,
    private cityService: CityService,
    private authService: AuthService,
    private peymentService: PeymentService,
    private router: Router,
  ) { }
  get gender() {
    return genderEnum;
  }
  get passengersAsControls() {
    return (this.passengersForm.get('passengers') as FormArray).controls;
  }
  get passengersAsArray() {
    return this.passengersForm.get('passengers') as FormArray;
  }

  ngOnInit() {
    this.getData();
    this.initial()
    this.passengersAsControls.pop();
    // this.passengersForm.get('passengers')?.valueChanges.subscribe((value: any) => {
    //   debugger
    //   this.listPassengersData = value;
    //   this.listPassengersData.map((item: any) => {
    //     if (item.gender == 1) 
    //       item.gender = 'زن'
    //     else 
    //       item.gender = 'مرد'
    //   })
    // })
    this.insertControls();
  }
  getData() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.tripInfo = params;
      this.price = Number(params.price);
      this.source = this.cityService.getById(Number(this.tripInfo.source));
      this.destination = this.cityService.getById(Number(this.tripInfo.destination));
      this.airline = this.airlineService.getById(Number(this.tripInfo.airline));
      this.adultCount = Number(this.tripInfo.adult);
      this.childCount = Number(this.tripInfo.child);
      this.babyCount = Number(this.tripInfo.baby);
      this.date = this.tripInfo.date;
      this.time = this.tripInfo.time;
      this.flightNumber = Number(this.tripInfo.flightNumber);
    });
  }
  insertControls() {
    if (this.adultCount > 0) {
      for (let i = 0; i < this.adultCount; i++) {
        this.passengersAsArray.push(this.createPassengerFormGroup(1));
      }
    }
    if (this.childCount > 0) {
      for (let i = 0; i < this.childCount; i++) {
        this.passengersAsArray.push(this.createPassengerFormGroup(2));
      }
    }
    if (this.babyCount > 0) {
      for (let i = 0; i < this.babyCount; i++) {
        this.passengersAsArray.push(this.createPassengerFormGroup(3));
      }
    }
    var selection = document.querySelector('#stepperPassenger');
    if (selection)
      this.stepper = new Stepper(selection, {
        linear: false,
        animation: true
      })
  }
  initial() {
    this.passengersForm = this.formBuilder.group({
      ticket: this.formBuilder.group({
        source: [this.source.id, Validators.required],
        distination: [this.destination.id, Validators.required],
        date: [this.tripInfo.date, [Validators.required]],
        price: [this.price, Validators.required],
        flightNumber: [this.tripInfo.flightNumber, Validators.required],
        airline: [this.airline.id, Validators.required]
      }),
      passengers: this.formBuilder.array([this.createPassengerFormGroup(0)])
    })
  }

  private createPassengerFormGroup(type: number): FormGroup {
    return new FormGroup({
      'id' : new FormControl(),
      'fName': new FormControl('', [Validators.required]),
      'lName': new FormControl('', [Validators.required]),
      'age': new FormControl(this.age, [Validators.required]),
      'gender': new FormControl('', [Validators.required]),
      'type': new FormControl(type)
    })
  }
  changeTicket() {
    this.router.navigate(['../list'],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          'source': this.source.id,
          'destination': this.destination.id,
          'adult': this.tripInfo.adult,
          'child': this.tripInfo.child,
          'baby': this.tripInfo.baby,
          'departingDate': this.tripInfo.date
        }
      })
  }
  onDataChange(item: any) {
    this.age = item;
  }

  deletePassenger(index: any) {
    this.passengersAsArray.removeAt(index);
  }

  next() {
    this.isclickOnNext = true;
    if (this.passengersForm.valid) {
      this.listPassengersData = this.passengersForm.get('passengers')?.value;
      console.log(this.listPassengersData);
      this.stepper.next();
    }
  }

  onSubmit() {
    return false;
  }
  onRoleSelectGender(event: any, item: FormGroup) {
    item.get('gender')?.setValue(event.id);
  }
  reserveFlight() {
    debugger
    const resualt = this.authService.isLoggedIn();
    var userIsLoged: any;
    resualt ? userIsLoged = this.authService.currentUser$.value : this.DirectToLogin();
    const peymentId = this.peymentService.addPeyment(this.listPassengersData);
    this.reserveData = { id: null, flightId: this.flightNumber, userId: userIsLoged.id, peymentId: peymentId };
    this.reservedService.addReserved(this.reserveData);
  }
  DirectToLogin() {
    this.router.navigate(['../login'], {
      relativeTo: this.activatedRoute
    })
  }
}

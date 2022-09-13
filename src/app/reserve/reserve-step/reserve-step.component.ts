import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { genderEnum } from 'src/app/shared/enums/gender.enum';
import { CityService } from 'src/app/core/services/city.service';
import { CityModel } from 'src/app/core/models/city.model';
import { AirlineModel } from 'src/app/core/models/airline.model';
import { AirlineService } from 'src/app/core/services/airline.service';
export enum passengerType {
  adult = 1,
  child = 2,
  baby= 3
}
@Component({
  selector: 'app-reserve-step',
  templateUrl: './reserve-step.component.html',
  styleUrls: ['./reserve-step.component.scss']
})

export class ReserveStepComponent implements OnInit {
  passengerType:typeof passengerType = passengerType;
  passengersForm: FormGroup;
  stepper: Stepper;
  tripInfo: any;
  isclickOnNext: Boolean = false;
  passengerTitle:string;
  /////// params /////////
  source: CityModel;
  destination: CityModel;
  travelPrice: any = {};
  adultCount: number;
  childCount: number;
  babyCount: number;
  price: number;
  airline: AirlineModel;
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
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private airlineService: AirlineService,
    private cityService: CityService,
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.tripInfo = params;
      this.price = Number(params.price);
      this.source = this.cityService.getById(Number(this.tripInfo.source));
      this.destination = this.cityService.getById(Number(this.tripInfo.destination));
      this.airline = this.airlineService.getById(Number(this.tripInfo.airline));
      this.adultCount = Number(this.tripInfo.adult);
      this.childCount = Number(this.tripInfo.child);
      this.babyCount = Number(this.tripInfo.baby);
      console.log("reserveStep", params);
    });
    this.initial()
    this.TravelPriceCalculation();
    this.passengersAsControls.pop();
    if (this.adultCount > 0) {
      for (let i = 0; i < this.adultCount; i++) {        
        this.passengerTitle='بزرگسال'
        this.passengersAsArray.push(this.createPassengerFormGroup(1));
        this.min = 13;
        this.max = 100;
      }
    }
    if (this.childCount > 0) {
      for (let i = 0; i < this.childCount; i++) {        
        this.passengerTitle='کودک'
        this.min = 2;
        this.max = 12;
        this.passengersAsArray.push(this.createPassengerFormGroup(2));
      }
    }
    if (this.babyCount > 0) {
      for (let i = 0; i < this.babyCount; i++) {
        this.passengerTitle='ک'
        this.min = 0;
        this.max = 2;
        this.passengersAsArray.push(this.createPassengerFormGroup(3));
      }
    }
    console.log(this.passengersAsArray);
    
    var selection = document.querySelector('#stepperPassenger');
    if (selection)
      this.stepper = new Stepper(selection, {
        linear: false,
        animation: true
      })
  }
  // adult: "2"
  // airline: "ایران ایر"
  // baby: "1"
  // child: "1"
  // date: "1400/04/01"
  // destination: "5"
  // flightNumber: "152"
  // price: "30000000"
  // source: "1"
  // travelMode: "0"

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
  private createPassengerFormGroup(type:number): FormGroup {
    return new FormGroup({
      'fName': new FormControl('', [Validators.required]),
      'lName': new FormControl('', [Validators.required]),
      'age': new FormControl('', [Validators.required]),
      'gender': new FormControl('', [Validators.required]),
      'type': new FormControl(type)
    })
  }
  TravelPriceCalculation() {
    this.travelPrice = { adultTicketPrice: this.tripInfo.adult * 900, childTicketPrice: this.tripInfo.child * 700, babyTicketPrice: this.tripInfo.baby * 500 };
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

 
  deletePassenger(index: any) {
    this.passengersAsArray.removeAt(index);
  }

  next() {
    this.isclickOnNext = true;
    if (this.passengersForm.valid)
      this.stepper.next();
  }

  onSubmit() {
    return false;
  }
  onRoleSelectGender(event:any,item:FormGroup ){
    item.get('gender')?.setValue(event.id);
  }
}

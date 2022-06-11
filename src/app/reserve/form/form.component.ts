import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbCalendarPersian, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CityModel } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formReserve: FormGroup;
  listCity: CityModel[];
  isClickOnSearchBtn: Boolean = false;
  countPassengar:number;
  ////////dropdown/////////////////
  dropdownSettings: IDropdownSettings;
  selectedSource = {};
  source: any;
  destination: any;
  Reservedata = {
    source: null,
    destination: null,
    returnDate: null,
    departingDate: null,
    passenger: 1,
    travelMode: 'یک طرفه'
  }
  listTravelMode = [
    { id: 0, name: 'یک طرفه' },
    { id: 1, name: 'رفت برگشت' }
  ];
  travelMode: any;
  data: any = {adultCount:1,childCount:0,babyCount:0};
  ////datePicker
  newDate = new Date(1400, 11, 24);
  time: any = null;
  placement = 'bottom';
  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
    this.initial();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
    };

  }
  initial() {
    this.formReserve = this.formBuilder.group({
      source: [this.Reservedata.source, Validators.required],
      destination: [this.Reservedata.destination, Validators.required],
      departingDate: [this.Reservedata.departingDate, Validators.required],
      returnDate: [this.Reservedata.returnDate],
      passenger: [this.Reservedata.passenger, Validators.required],
      travelMode: [this.Reservedata.travelMode]
    })
  }

  // travelMode: this.formBuilder.group({
  //   oneWay:[{ value: 'یک طرفه', disabled: true} , Validators.required] ,
  //   twoWay:['رفت و برگشت', Validators.required]
  // })

  getData() {
    this.listCity = this.cityService.getData();
    this.travelMode="یک طرفه";
  }
  onDestinationSelect(data: any) {
    
    this.destination = data.name
    console.log(this.destination);

  }
  onSourceSelect(data: any) {
    this.source = data.name;
  }
  onTravelModeSelect(data: any) {
    this.travelMode = data.name;
    this.formReserve?.get("travelMode")?.setValue(this.travelMode);    
  }
  search() {
    
    this.isClickOnSearchBtn = true;
    this.formReserve?.get("source")?.setValue(this.source);
    this.formReserve?.get("destination")?.setValue(this.destination);
    this.formReserve?.get("travelMode")?.setValue(this.travelMode);
    this.formReserve?.get("passengar")?.setValue(this.countPassengar);

    if (this.formReserve.invalid) {
      return
    }
    else {
      debugger
    this.router.navigate(['../list',
      this.source,
      this.destination,
      this.data.adultCount,
      this.data.childCount,
      this.data.babyCount,
      this.formReserve.get("travelMode")?.value
    ],
      {
        relativeTo: this.activatedRoute
      })
    }
  }

  CalculateCountPassenger(item: any) {
    this.data = item;
    this.countPassengar=this.data.adultCount+this.data.childCount+this.data.babyCount;
  }
  changeDestinationSource() {
    const itemDes = this.destination;
    this.formReserve?.get("source")?.setValue(this.destination);
    this.formReserve?.get("destination")?.setValue(this.source);
    this.destination = this.source;
    this.source = itemDes;
  }
}

// CalculateDate() {
//   var departingDate = this.formReserve.get('departingDate')?.value;
//   var returnDate = this.formReserve.get('returnDate')?.value;
//   if (departingDate) {
//     var day = Number(departingDate.day);
//     var month = Number(departingDate.month);
//     var year = Number(departingDate.year);
//     this.newDate.setMonth(month);
//     this.newDate.setDate(day);
//     this.newDate.setFullYear(year);
//   }
//   if (returnDate) {
//     var day = Number(returnDate.day);
//     var month = Number(returnDate.month);
//     var year = Number(returnDate.year);
//     this.newDate.setMonth(month);
//     this.newDate.setDate(day);
//     this.newDate.setFullYear(year);
//   }
// }
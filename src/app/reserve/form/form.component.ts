import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CityModel } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city.service';
import { FlightTypeEnum } from 'src/app/shared/enums/fight-type.enum';
import { IActiveDate } from 'ng-persian-datepicker';
import { Jalali } from 'jalali-ts';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formReserve: FormGroup;
  listCity: CityModel[];
  isClickOnSearchBtn: Boolean = false;
  ////////passenger////////////////
  countPassengar: number = 1;
  dataPassenger: any = { adultCount: 1, childCount: 0, babyCount: 0 };
  ////////dropdown/////////////////
  dropdownSettings: IDropdownSettings;
  selectedSource = {};
  source: any;
  destination: any;
  Reservedata = {
    source: null,
    destination: null,
    passenger: 1,
    returnDate: null,
    departingDate: Date.now(),
    travelMode: FlightTypeEnum.OneWay,
  };
  //////////travelMode/////////////
  listTravelMode = [
    { id: 1, name: 'یک طرفه' },
    { id: 2, name: 'رفت برگشت' },
  ];
  travelMode: any = FlightTypeEnum.OneWay;
  labelTravelMode: string = 'یک طرفه';
  ////datePicker//////////////////
  minDate = Jalali.parse('1401-04-01');
  maxDate = Jalali.parse('1401-05-01');
  returnDate:Date;
  departingDate:Date;
  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  get flightType() {
    return FlightTypeEnum;
  }
  ngOnInit(): void {
    // this.maxDate.setDate(this.minDate.getMonth() +1);
    console.log(this.maxDate ,"min:", this.minDate);
    
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
      travelMode: [this.travelMode],
      source: [this.source, Validators.required],
      destination: [this.destination, Validators.required],
      departingDate: [this.departingDate, Validators.required],
      returnDate: [this.returnDate],
      passenger: [this.countPassengar, Validators.required],
    });
    this.formReserve.controls['returnDate'].disable();
    this.formReserve.updateValueAndValidity();
  }
  getData() {
    this.listCity = this.cityService.getData();
  }
  onDestinationSelect(data: any) {
    this.destination = data.name;
  }
  onSourceSelect(data: any) {
    this.source = data.name;
  }
  onTravelModeSelect(data: any) {
    this.labelTravelMode = data.name;
    if (data.id === FlightTypeEnum.Return) {
      this.travelMode = FlightTypeEnum.Return;
      this.formReserve.controls['returnDate'].enable();
    }
    else {
      this.travelMode = FlightTypeEnum.OneWay;
      this.formReserve.controls['returnDate'].disable();
    }
    this.formReserve?.get('travelMode')?.setValue(this.travelMode);
  }
  search() {
    this.isClickOnSearchBtn = true;
    // this.formReserve?.get('source')?.setValue(this.source);
    // this.formReserve?.get('destination')?.setValue(this.destination);
    // this.formReserve?.get('travelMode')?.setValue(this.travelMode);
    this.formReserve?.get('passenger')?.setValue(this.countPassengar);

    if (this.formReserve.invalid) {
      return;
    }
    else {
      this.router.navigate(
        [
          '../list',
          this.source,
          this.destination,
          this.dataPassenger.adultCount,
          this.dataPassenger.childCount,
          this.dataPassenger.babyCount,
          this.formReserve.get('travelMode')?.value,
        ],
        {
          relativeTo: this.activatedRoute,
        }
      );
    }
  }

  CalculateCountPassenger(item: any) {
    this.dataPassenger = item;
    this.countPassengar = this.dataPassenger.adultCount + this.dataPassenger.childCount + this.dataPassenger.babyCount;
  }
  changeDestinationSource() {
    const itemDes = this.destination;
    this.formReserve?.get('source')?.setValue(this.destination);
    this.formReserve?.get('destination')?.setValue(this.source);
    this.destination = this.source;
    this.source = itemDes;
  }
  onSelect(event: any) {
    debugger
    console.log(event);

  }
  // onInitt(event: any){
  //   console.log("test");

  //   this.formReserve?.get('departingDate')?.setValue(event);
  // }
}


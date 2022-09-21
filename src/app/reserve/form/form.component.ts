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
import * as moment from 'jalali-moment'
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
    countPassengar: 1,
    returnDate: null,
    departingDate: null,
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
  returnDate: Date;
  departingDate=new Date();
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
    this.getData();
    this.initial();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
    };
    this.formReserve.get('departingDate')?.valueChanges.subscribe((value: any) => {
      this.departingDate = value;
      console.log(this.departingDate);
      
      // console.log( moment(v,'jYYYY/jMM/jDD'));
    })
  }
  /////////validator custome
  initial() {
    this.formReserve = this.formBuilder.group({
      // travelMode: [this.travelMode],
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

  search() {
    this.isClickOnSearchBtn = true;
    this.formReserve?.get('source')?.setValue(this.source);
    this.formReserve?.get('destination')?.setValue(this.destination);
    // this.formReserve?.get('travelMode')?.setValue(this.travelMode);
    this.formReserve?.get('passenger')?.setValue(this.countPassengar);
    this.formReserve?.get('departingDate')?.setValue(this.departingDate);
    this.formReserve?.get('returnDate')?.setValue(this.returnDate);

    if (this.formReserve.invalid) {
      return;
    }
    else {
      this.router.navigate(
        ['../list'],
        {
          queryParams:
          {
            'source': this.source,
            'destination': this.destination,
            'adult': this.dataPassenger.adultCount,
            'child': this.dataPassenger.childCount,
            'baby': this.dataPassenger.babyCount,
            // 'travelMode': this.travelMode,
            'departingDate': this.departingDate,
            'returnDate' : this.returnDate? this.returnDate : ''
          },
          relativeTo: this.activatedRoute,
        }
      );
    }
  }

  onDestinationSelect(data: any) {
    this.destination = data.id;
  }
  onSourceSelect(data: any) {
    this.source = data.id;
  }
  // onTravelModeSelect(data: any) {
  //   this.labelTravelMode = data.name;
  //   if (data.id === FlightTypeEnum.Return) {
  //     this.travelMode = FlightTypeEnum.Return;
  //     this.formReserve.controls['returnDate'].enable();
  //   }
  //   else {
  //     this.travelMode = FlightTypeEnum.OneWay;
  //     this.formReserve.controls['returnDate'].disable();
  //   }
  //   this.formReserve?.get('travelMode')?.setValue(this.travelMode);
  // }
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

}


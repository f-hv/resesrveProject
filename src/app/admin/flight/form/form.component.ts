import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineModel } from 'src/app/core/models/airline.model';
import { AirlineService } from 'src/app/core/services/airline.service';
import { CityModel } from '../../../core/models/city.model';
import { FlightModel } from '../../../core/models/flight.model';
import { CityService } from '../../../core/services/city.service';
import { FlightService } from '../../../core/services/flight.service';
import { NgbCalendar, NgbCalendarPersian, NgbDatepickerI18n, NgbDate, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
  getWeekdayLabel(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    NgbInputDatepickerConfig,
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]///datepicker
})
export class FormComponent implements OnInit {
  @Input() id: any;
  dataFlight: FlightModel;
  formFlight: FormGroup;
  listCity: CityModel[];
  listAirline: AirlineModel[];
  isClickOnSaveBtn = false;
  /////dropdown 
  dropdownSettings: IDropdownSettings
  selectedSource = {};
  source: any;
  destination: any;
  IdAirline: any;
  data: CityModel | undefined;
  ///// datepicker
  newDate = new Date(1400, 11, 24, 10, 33, 30);
  editDate = new Date();
  today = new Date();
  placement = 'bottom';
  dateNew: any;
  ////timepicker
  time: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private cityService: CityService,
    private airlineService: AirlineService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private config: NgbInputDatepickerConfig,
    private calendar: NgbCalendar,
    private toastrService:ToastrService
  ) {
    //  isDisabled = (date: NgbDate, current: {month: number, year: number}) => date.month !== current.month;
    //  isWeekend = (date: NgbDate) =>  this.calendar.getWeekday(date) >= 6;
  }
  ngOnInit(): void {
    this.listCity = this.cityService.getData();
    this.listAirline = this.airlineService.getData();
    if (this.id) {
      this.dataFlight = this.flightService.getById(this.id);

      this.data = this.listCity.find(item => item.name === this.dataFlight.source);
      this.selectedSource = { idField: this.data?.id, textField: this.data?.name };
      this.updateValueTimeDate();
    }
    else {
      this.dataFlight = {
        id: null,
        source: null,
        destination: null,
        date: null,
        price: null,
        airline: null,
        flightNumber: null,
        deleted: 0
      }
    }
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
    this.formFlight = this.formBuilder.group({
      id: [this.dataFlight?.id],
      source: [this.dataFlight.source, [Validators.required]],
      destination: [this.dataFlight.destination, Validators.required],
      airline: [this.dataFlight.airline, Validators.required],
      date: [this.dataFlight.date, Validators.required],
      time: [this.time, [Validators.required]],
      price: [this.dataFlight?.price, [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
      flightNumber: [this.dataFlight?.flightNumber, Validators.required],
      deleted: 0
    });
    this.formFlight?.get("date")?.setValue(this.dateNew);
  }
  cancel() {
    this.navigate();
  }

  save() {
    if (this.source)
      this.formFlight?.get("source")?.setValue(this.source);
    if (this.destination)
      this.formFlight?.get("destination")?.setValue(this.destination);
    if (this.IdAirline)
      this.formFlight?.get("airline")?.setValue(this.IdAirline);
    this.isClickOnSaveBtn = true;
    if (this.formFlight.invalid) {
      return;
    }
    else {
      this.combineTimeDate();
      this.formFlight?.get("date")?.setValue(this.newDate);
      if (this.id) {
        this.update();
      }
      else {
        this.create();
      }
      this.navigate();
    }
  }
  update() {
    const resualt = this.flightService.update(this.formFlight.value);
    if (resualt)
    this.toastrService.success('update succesfull');
    else
    this.toastrService.error('update failed','sorry!');
  }

  create() {
    this.flightService.create(this.formFlight.value);
    this.toastrService.success('The new airline was create successfully','success');

  }

  combineTimeDate() {
    var time = this.formFlight.get('time')?.value;
    var date = this.formFlight.get('date')?.value;
    ////////// SET DATE ///////////
    if (date) {
      var day = Number(date.day);
      var month = Number(date.month);
      var year = Number(date.year);
      this.newDate.setMonth(month);
      this.newDate.setDate(day);
      this.newDate.setFullYear(year);
    }
    ////////// SET TIME ///////////
    var hour = Number(time.hour);
    var minute = Number(time.minute);
    var second = Number(time.second);
    this.newDate.setHours(hour);
    this.newDate.setMinutes(minute);
  }
  navigate() {
    this.router.navigate([this.id ? '../..' : '..'], {
      relativeTo: this.activatedRoute,
    });
  }
  //////multiselect Dropdown
  onSourceSelect(item: any) {
    this.source = '';
    const selectedSource = this.listCity.find(city => city.id === item.id);
    this.source = selectedSource?.name;
  }
  ondestinationSelect(item: any) {
    const selecteddestination = this.listCity.find(city => city.id === item.id);
    this.destination = selecteddestination?.name;
  }
  onAirlineSelect(item: any) {
    const selectedAirline = this.listAirline.find(airline => airline.id === item.id);
    this.IdAirline = selectedAirline?.id;
  }
  updateValueTimeDate() {
    if (this.dataFlight.date) {
      this.editDate = this.dataFlight.date;
      var hour = this.editDate.getHours();
      var minute = this.editDate.getMinutes();
      this.time = { hour: hour, minute: minute };

      var year = this.editDate.getFullYear();
      var month = this.editDate.getMonth();
      var day = this.editDate.getDate();
      this.dateNew = { "year": year, "month": month, "day": day }
      // dateNew.setDate(day);
      // dateNew.setFullYear(year);
      // dateNew.setMonth(month);
      // { "year": 1400, "month": 11, "day": 22 }
    }
  }
}

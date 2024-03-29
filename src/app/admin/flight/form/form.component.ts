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
import * as moment from 'jalali-moment'
@Injectable()
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    NgbInputDatepickerConfig,
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
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
  airline: any;
  data: CityModel | undefined;
  ///// datepicker
  newDate = new Date();
  editDate = new Date();
  today = new Date();
  placement = 'bottom';
  dateNew: any;
  ////timepicker
  time: any = null;
  newTime: string ;
  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private cityService: CityService,
    private airlineService: AirlineService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private config: NgbInputDatepickerConfig,
    private calendar: NgbCalendar,
    private toastrService: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.listCity = this.cityService.getData();
    this.listAirline = this.airlineService.getData();
    if (this.id) {
      this.dataFlight = this.flightService.getById(this.id);
    }
    else {
      this.dataFlight = {
        id: null,
        source: null,
        destination: null,
        date: null,
        time: null,
        price :null,
        airline: null,
        flightNumber: null,
        deleted: 0
      }
    }

    this.initial();
    this.formFlight?.get('date')?.valueChanges.subscribe((value: any) => {
      this.newDate = value;
      // moment(value,'jYYYY/jMM/jDD') ;      
    })
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
    };

  }
  initial() {
    this.formFlight = this.formBuilder.group({
      id: [this.dataFlight?.id],
      source: [this.dataFlight.source, [Validators.required]],
      destination: [this.dataFlight.destination, Validators.required],
      airline: [this.dataFlight.airline, Validators.required],
      date: [this.dataFlight.date, Validators.required],
      time: [this.dataFlight.time, [Validators.required]],
      flightNumber: [this.dataFlight?.flightNumber, Validators.required],
      price: [this.dataFlight?.price, Validators.required],
      deleted: 0
    });
  }
  cancel() {
    this.navigate();
  }

  save() {
    this.isClickOnSaveBtn = true;
    if (this.formFlight.invalid) {
      return;
    }
    this.formFlight?.get('date')?.setValue(this.newDate);
    this.formFlight?.get('time')?.setValue(this.newTime);
    this.formFlight?.get('destination')?.setValue(this.destination);
    this.formFlight?.get('source')?.setValue(this.source);
    this.formFlight.get('airline')?.setValue(this.airline)
    if (this.id) {
      this.update();
    }
    else {
      this.create();
    }
    this.navigate();
  }

  update() {
    const resualt = this.flightService.update(this.formFlight.value);
    resualt? this.toastrService.success('ویرایش انجام شد ') && this.navigate() : this.toastrService.error('خطایی رخ داده است');
  }

  create() {
    const resualt = this.flightService.create(this.formFlight.value);
    resualt ?  this.toastrService.success('پرواز با موفقیت ثبت شد', 'success') && this.navigate(): this.toastrService.warning('این پرواز قبلا ثبت شده');
  }
  navigate() {
    this.router.navigate([this.id ? '../..' : '..'], {
      relativeTo: this.activatedRoute,
    });
  }
  onSourceSelect(item: any) {
    this.source = item.id;
  }
  ondestinationSelect(item: any) {
    this.destination = item.id;
  }
  onAirlineSelect(item: any) {
    this.airline = item.id;
  }

  onTimeChange(value: { hour: string, minute: string }) {
    this.newTime = value?.hour +":" + value?.minute;   
  }
  onDateChange(value:any){
    this.newDate = value;    
  }
}

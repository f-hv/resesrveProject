import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineModel } from 'src/app/core/models/airline.model';
import { AirlineService } from 'src/app/core/services/airline.service';
import { CityModel } from '../../../core/models/city.model';
import { FlightModel } from '../../../core/models/flight.model';
import { CityService } from '../../../core/services/city.service';
import { FlightService } from '../../../core/services/flight.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() id: any;
  dataFlight: FlightModel;
  formFlight: FormGroup;
  listCity: CityModel[];
  listAirline :AirlineModel[];
  isClickOnSaveBtn = false;
  /////dropdown 
  dropdownSettings = {};
  source: any;
  distination: any;
  IdAirline:any;
  ///// datepicker
  min: Date;
  max: Date;
  // formcontrol = new FormControl(new Date());
  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private cityService: CityService,
    private airlineService :AirlineService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // this.min = this.dateService.addMonth(this.dateService.today(), -1);
    // this.max = this.dateService.addMonth(this.dateService.today(), 1);
  }
  ngOnInit(): void {
    this.listCity = this.cityService.getData();
    this.listAirline=this.airlineService.getData();
    console.log(this.listCity);

    if (this.id) {
      this.dataFlight = this.flightService.getById(this.id);
    }
    else this.dataFlight = {
      id: null,
      source: null,
      distination: null,
      date: null,
      time:null,
      price: null,
      airlineId: null,
      backFlightId: null,
      flightNumber: null,
      deleted: 0
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
      source: [this.source, Validators.required],
      distination: [this.distination, Validators.required],
      airlineId: [this.IdAirline, Validators.required],
      date: [this.dataFlight?.date],
      time:[this.dataFlight?.time],
      price: [this.dataFlight?.price, Validators.required,Validators.minLength(5), Validators.maxLength(6)],
      backFlightId: [this.dataFlight?.backFlightId],
      flightNumber: [this.dataFlight?.flightNumber, Validators.required],
      deleted: 0
    });
  }
  cancel() {
    this.navigate();
  }

  save() {
    this.formFlight?.get("source")?.setValue(this.source);
    this.formFlight?.get("distination")?.setValue(this.distination);
    this.formFlight?.get("airlineId")?.setValue(this.IdAirline);
    this.isClickOnSaveBtn = true;
    if (this.formFlight.invalid)
      return
    else {
      if (this.id) {
        this.update();
      }
      else {
        this.create();
      }
      this.navigate();
    }
  }
  update(){
    const resualt = this.flightService.update(this.formFlight.value);
    if (resualt)
      console.log("update succesfull");
    else
      console.log("fail update");
  }

  create(){
    this.flightService.create(this.formFlight.value);
    console.log("create succesfull");
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
  onDistinationSelect(item: any) {
    const selectedDistination = this.listCity.find(city => city.id === item.id);
    this.distination = selectedDistination?.name;
  }
  onAirlineSelect(item:any){
    const selectedAirline = this.listAirline.find(airline => airline.id === item.id);
    this.IdAirline = selectedAirline?.id;
  }
}

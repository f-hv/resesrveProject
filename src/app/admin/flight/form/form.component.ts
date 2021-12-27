import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
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
  /////dropdown 
  dropdownSettings = {};
  source: any;
  distination: any;
  ///// datepicker
  min:Date;
  max:Date;
  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private cityService: CityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected dateService:NbDateService<Date>
  ) { 
    this.min = this.dateService.addMonth(this.dateService.today(), -1);
    this.max = this.dateService.addMonth(this.dateService.today(), 1);
  }
  ngOnInit(): void {
    this.listCity = this.cityService.getData();
    console.log(this.listCity);
    
    if (this.id) {
      this.dataFlight = this.flightService.getById(this.id);  
    }
    else this.dataFlight = {
      id: null,
      source: null,
      distination: null,
      date: null,
      price: null,
      airlineId: null,
      backFlightId: null,
      flightNumber: null,
      deleted:0
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
      source: [this.source],
      distination: [this.distination],
      airlineId:[this.dataFlight?.airlineId],
      date: [this.dataFlight?.date],
      price: [this.dataFlight?.price],
      backFlightId: [this.dataFlight?.backFlightId],
      flightNumber: [this.dataFlight?.flightNumber],
      deleted: 0
    });
  }
  cancel() {
    this.navigate();
  }

  save() {
    this.formFlight?.get("source")?.setValue(this.source);
    this.formFlight?.get("distination")?.setValue(this.distination);
    if (this.id) {
      const resualt = this.flightService.update(this.formFlight.value);
      if (resualt)
        console.log("update succesfull");
      else
        console.log("fail update");
    }
    else {
      this.flightService.create(this.formFlight.value);
      console.log("create succesfull");
    }
    this.navigate();
  }
  navigate() {
    this.router.navigate([this.id ? '../..' : '..'], {
      relativeTo: this.activatedRoute,
    });
  }
  //////multiselect Dropdown
  onSourceSelect(item: any) {
    this.source='';
    const selectedSource = this.listCity.find(city => city.id === item.id);
    this.source = selectedSource?.name;
  }
  onDistinationSelect(item: any) {
    const selectedDistination = this.listCity.find(city => city.id === item.id);
    this.distination = selectedDistination?.name;
  }
}

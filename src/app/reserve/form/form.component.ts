import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar,NgbCalendarPersian,NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
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
  ////////dropdown/////////////////
  dropdownSettings: IDropdownSettings;
  selectedSource = {};
  source: any;
  destination: any;
  dataCity = {
    id: null,
    source: null,
    destination: null,
    returnDate: null,
    departingDate: null,
    passenger: null
  }
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
      id: [this.dataCity?.id],
      source: [this.dataCity.source],
      destination: [this.dataCity.destination],
      departingDate: [this.dataCity.departingDate],
      returnDate: [this.dataCity.returnDate],
      passenger: [this.dataCity.passenger]
    })
  }
  getData() {
    this.listCity = this.cityService.getData();
  }
  onDestinationSelect(data: any) {
    this.destination = data.id

  }
  onSourceSelect(data: any) {
    this.source = data.id;
  }
  search() {
    this.formReserve?.get("source")?.setValue(this.source);
    this.formReserve?.get("destination")?.setValue(this.destination);
    this.router.navigate(['../list',
      {
        source: this.formReserve.get("source")?.value,
        destination: this.formReserve.get("destination")?.value,
        passenger: this.formReserve.get("passenger")?.value
      }],

      {
        relativeTo: this.activatedRoute
      })
  }
  CalculateDate() {
    var departingDate = this.formReserve.get('departingDate')?.value;
    var returnDate = this.formReserve.get('returnDate')?.value;
    if (departingDate) {
      var day = Number(departingDate.day);
      var month = Number(departingDate.month);
      var year = Number(departingDate.year);
      this.newDate.setMonth(month);
      this.newDate.setDate(day);
      this.newDate.setFullYear(year);
    }
    if (returnDate) {
      var day = Number(returnDate.day);
      var month = Number(returnDate.month);
      var year = Number(returnDate.year);
      this.newDate.setMonth(month);
      this.newDate.setDate(day);
      this.newDate.setFullYear(year);
    }
  }
}

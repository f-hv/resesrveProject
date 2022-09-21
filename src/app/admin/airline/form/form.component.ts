import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineModel } from '../../../core/models/airline.model';
import { AirlineService } from '../../../core/services/airline.service';
import { CityModel } from '../../../core/models/city.model';
import { CityService } from '../../../core/services/city.service';
import { loadWeight } from 'src/app/core/models/loadWeight.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() id: any;
  formAirline: FormGroup;
  listLoadWeight: loadWeight[] = [
    { id: 1, weight: 20 },
    { id: 2, weight: 25 },
    { id: 3, weight: 30 },
  ]
  dataAirline: AirlineModel;
  listCity: CityModel[];
  isClickOnSaveBtn = false;

  ////////////multiselect Dropdown
  dropdownSettings = {};
  dropdownSettingsLoad = {}
  city: any;
  loadWeight: any;
  airlineId :number;
  constructor(
    private airlineService: AirlineService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.listCity = this.cityService.getData();
    if (this.id) {
      this.dataAirline = this.airlineService.getById(this.id);
      console.log(this.dataAirline);
      
    }
    else {
      this.dataAirline = {
        id: null,
        name: null,
        city: null,
        loadWeight: null,
        deleted: 0
      }
    }
    this.initial();
    ////////////multiselect Dropdown
    this.dropdownSettingsLoad = {
      singleSelection: true,
      idField: 'id',
      textField: 'weight',
      itemsShowLimit: 20,
    };
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 20,
    };
  }

  initial() {
    this.formAirline = this.formBuilder.group({
      id: [this.dataAirline?.id],
      name: [this.dataAirline?.name, Validators.required],
      city: [this.dataAirline?.city, Validators.required],
      loadWeight: [this.dataAirline?.loadWeight, Validators.required],
      deleted: 0
    })
  }

  save() {
    this.isClickOnSaveBtn = true
    if (this.formAirline.invalid) {
      return
    }
    else {
      this.formAirline?.get('city')?.setValue(this.city);
      this.formAirline?.get('loadWeight')?.setValue(this.loadWeight);

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
    const resualt = this.airlineService.update(this.formAirline.value);
    resualt ? this.toastrService.success('ویرایش انجام شد ') : this.toastrService.error('خطایی رخ داده است');
  }
  create() { 
    const resualt = this.airlineService.create(this.formAirline.value);
    resualt ? this.toastrService.success(' با موفقیت ثبت شد', 'success') && this.navigate() : this.toastrService.warning('خطایی رخ داده است');

  }
  cancel() {
    this.navigate();
  }
  navigate() {
    this.route.navigate([this.id ? '../..' : '..'], {
      relativeTo: this.activatedRoute,
    })
  }
  onCitySelect(item: any) {
    this.city = item.name;
  }
  onLoadSelect(item: any) {
    this.loadWeight = item.weight;
  }

}

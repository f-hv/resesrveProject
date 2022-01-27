import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineModel } from '../../../core/models/airline.model';
import { AirlineService } from '../../../core/services/airline.service';
import { CityModel } from '../../../core/models/city.model';
import { CityService } from '../../../core/services/city.service';
import { loadWeight } from 'src/app/core/models/loadWeight.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() id: any;
  formAirline: FormGroup;
  listLoadWeight:loadWeight[]=[
    { id:1 , weight:20 },
    { id:2 , weight:25 },
    { id:3 , weight:30 },
  ]
  listPriceClass: any[] = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'D' },
    { id: 4, name: 'F' },
    { id: 5, name: 'H' },
    { id: 6, name: 'J' },
    { id: 7, name: 'K' },
    { id: 8, name: 'L' },
    { id: 9, name: 'M' },
    { id: 10, name: 'N' },
    { id: 11, name: 'O' },
    { id: 12, name: 'P' },
    { id: 13, name: 'Q' },
    { id: 14, name: 'R' },
    { id: 15, name: 'S' },
    { id: 16, name: 'Y' },
    { id: 17, name: 'W' },
    { id: 18, name: 'P' },
  ];
  dataAirline: AirlineModel;
  listCity: CityModel[];
  isClickOnSaveBtn=false;
  
    ////////////multiselect Dropdown
  dropdownSettings = {};
  dropdownSettingsLoad={}
  priceClass: any;
  city: any;
  loadWeight:any;

  constructor(
    private airlineService: AirlineService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listCity = this.cityService.getData();
    if (this.id) {
      this.dataAirline = this.airlineService.getById(this.id);    
    }
    else {
      this.dataAirline = {
        id: null,
        name: null,
        city: null,
        priceClass: null,
        loadWeight: null,
        deleted: null
      }
    }
    this.initial();
    ////////////multiselect Dropdown
    this.dropdownSettingsLoad = {
      singleSelection: true,
      idField: 'id',
      textField: 'weight',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
    };
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
    this.formAirline = this.formBuilder.group({
      id: [this.dataAirline?.id],
      name: [this.dataAirline?.name, Validators.required],
      city: [this.dataAirline?.city, Validators.required],
      priceClass: [this.dataAirline?.priceClass, Validators.required],
      loadWeight: [this.dataAirline?.loadWeight, Validators.required],
    })
  }

  save() {
    debugger
    this.isClickOnSaveBtn = true
    if (this.formAirline.invalid) {
      return
    }
    else {
      this.formAirline?.get('priceClass')?.setValue(this.priceClass);
      this.formAirline?.get('city')?.setValue(this.city);
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
    const resualt = this.airlineService.update(this.formAirline.value);
    if (resualt)
      console.log("update succesfull");
    else
      console.log("fail update");
  }
  create(){
    this.airlineService.create(this.formAirline.value);
    console.log("create succesfull");
  }
  cancel() {
    this.navigate();
  }
  navigate() {
    this.route.navigate([this.id ? '../..' : '..'], {
      relativeTo: this.activatedRoute,
    })
  }

  ////////////multiselect Dropdown
  onPriceClassSelect(item: any) {
    const selectedPClass = this.listPriceClass.find(pClass => pClass.id === item.id);
    this.priceClass = selectedPClass?.name;
  }
  onCitySelect(item: any) {
    const selectedCity = this.listCity.find(cityItem => cityItem.id === item.id);
    this.city = selectedCity?.name;
  }
  onLoadSelect(item:any){
    const selectedLoad = this.listLoadWeight.find(load => load.id === item.id);
    this.loadWeight = selectedLoad?.weight;
  }

}

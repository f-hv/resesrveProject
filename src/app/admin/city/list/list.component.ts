import { Component, OnInit } from '@angular/core';
import { CityModel } from '../../../core/models/city.model';
import { CityService } from '../../../core/services/city.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listCity: CityModel[] = [];
  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void { 
    this.getData();
  }

  getData() {
    this.listCity = this.cityService.getData();
    this.listCity=this.listCity.filter(item => item.deleted === 0);
  }

  delete(item: any) {
    this.cityService.delete(item);
    this.getData();
  }
  
  cityById(index:any,city:any){
    return city.id
  }


}

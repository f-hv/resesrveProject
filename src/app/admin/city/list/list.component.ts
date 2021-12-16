import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city.service';

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
    console.log("list:",this.listCity);
    
  }

  getData() {
    this.listCity = this.cityService.getData()
  }
  delete(item: any) {
    this.cityService.delete(item);
    this.getData();
  }


}

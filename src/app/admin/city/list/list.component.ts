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
  searchKeyWord:any

   ///// pagination
   currentPage :any =1;
   elementPerpage = 5;
   collectionSize: number;
  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void { 
    this.getData();
  }

  getData() {
    this.listCity = this.cityService.getData();
    this.listCity=this.listCity.filter(item => item.deleted === 0);
    this.collectionSize = this.listCity.length;
  }

  delete(item: any) {
    this.cityService.delete(item);
    this.getData();
  }
  
  cityById(index:any,city:any){
    return city.id
  }
  onKeyup(item: any) {
    if (item.keycode !== 13 || item.keycode !== 8) {
      this.searchKeyWord = item;
    }
    if (this.searchKeyWord.length === 0) {
      this.listCity = this.cityService.getOrginalList();
    }
    if (this.searchKeyWord.length > 1) {
      if (item.keycode !== 13 || item.keycode !== 8) {
        this.getData();
        this.listCity = this.listCity.filter(city => city.name?.includes(item));
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AirlineModel } from '../../../core/models/airline.model';
import { AirlineService } from '../../../core/services/airline.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listAirline: AirlineModel[];
  searchKeyWord: any;
  ///// pagination
  currentPage: any = 1;
  elementPerpage = 5;
  collectionSize: number;
  constructor(
    private airlineService: AirlineService,
    private toastrService: ToastrService
  ) { }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.listAirline = this.airlineService.getData();
    this.listAirline = this.listAirline.filter(item => item.deleted === 0);
    this.collectionSize = this.listAirline.length;
  }
  delete(item: any) {
    const resualt = this.airlineService.delete(item);
    if (resualt)
      this.toastrService.success('delete succesfull');
    else
      this.toastrService.success('failed deleted');
    this.getData();
  }
  airlineById(index: any, line: any) {
    return line.id;
  }

  onKeyup(item: any) {
    (item.keycode !== 13 || item.keycode !== 8)?  this.searchKeyWord = item: '';
    this.searchKeyWord.length === 0 ? this.listAirline = this.airlineService.getOrginalList() : '';
    if (this.searchKeyWord)
      this.searchKeyWord.length === 1 && (item.keycode !== 13 || item.keycode !== 8) ? this.getData() : ''
    if (this.searchKeyWord.length > 1 && (item.keycode !== 13 || item.keycode !== 8)) {
      this.getData();
      this.listAirline = this.listAirline.filter(line =>
        line.city?.includes(item) ||
        line.name?.includes(item) ||
        line.loadWeight == item
      );
    }
  }
}

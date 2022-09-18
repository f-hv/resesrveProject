import { Component, OnInit } from '@angular/core';
import { ReservedModel } from 'src/app/core/models/reserved.model';
import { ReservedService } from 'src/app/core/services/reserved.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listReserved:ReservedModel[];
  reserveData:any[]=[];
   ///// pagination
   currentPage: any = 1;
   elementPerpage = 5;
   collectionSize: number;
    ///// search
  searchKeyWord: any;
  constructor(
    private reservService:ReservedService,
  ) { }

  ngOnInit(): void { }

  getData(){

  }

  onKeyup(item: any) {
    // if (item.keycode !== 13 || item.keycode !== 8) {
    //   this.searchKeyWord = item;
    // }
    // this.searchKeyWord.length === 0 ? this.listReserved = this.reservService.getData() : '';
    // if (this.searchKeyWord.length > 1 && (item.keycode !== 13 || item.keycode !== 8)) {
    //   this.getData();
    //   this.reserveData = this.reserveData.filter(user =>
    //     user.userName?.includes(item) ||
    //     user.firstName?.includes(item) ||
    //     user.password?.includes(item) ||
    //     user.email?.includes(item) ||
    //     user.role?.includes(item)
    //   );
    // }
  }

}

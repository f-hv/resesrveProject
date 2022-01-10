import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() searchItem:any;
  @Input() size:any;
  @Input() placeHolder:any;
  @Output() keyupChange=new EventEmitter<any>();
  inputSearchKeyword:any
  constructor() { }

  ngOnInit(): void {}
  Keyup(value:any){
    this.keyupChange.emit(this.inputSearchKeyword);
  }
  handleOnClickCloseIcon() {
    this.inputSearchKeyword = '';
    this.Keyup(this.inputSearchKeyword);
  }
}

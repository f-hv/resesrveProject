import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  id:any;
  constructor(
    private actiatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routParam=this.actiatedRoute.snapshot.paramMap;
    this.id=Number(routParam.get('id'));
  }

}

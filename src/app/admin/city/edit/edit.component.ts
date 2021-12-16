import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id:any
  constructor(
    private activateRout:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramRoute=this.activateRout.snapshot.paramMap;
    this.id=Number(paramRoute.get('id'))
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  id:any;
  constructor(
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramRoute=this.activatedRoute.snapshot.paramMap;
    this.id= Number(paramRoute.get('id'))
   }
}

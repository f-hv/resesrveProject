import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  navbarOpen:false;
  constructor(
    private router:Router,
    private activetedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void { }


}

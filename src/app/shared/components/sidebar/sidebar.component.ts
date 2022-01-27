import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() navbarOpen = false;
  constructor() { }

  ngOnInit(): void {  }
  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
 
}

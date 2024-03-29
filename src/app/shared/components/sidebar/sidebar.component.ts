import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() navbarOpen = false;
  constructor(
    private authService:AuthService,
    private router:Router,
    private activetedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {  }
  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['../login'],{
      relativeTo:this.activetedRoute
    })
  }
 
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CityModel } from '../../../core/models/city.model';
import { CityService } from '../../../core/services/city.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() id: any;
  orginalName:any;
  listCity: CityModel;
  isClickOnSaveBtn=false;
  constructor(
    private cityService: CityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.listCity = this.cityService.getById(this.id);
      this.orginalName=this.listCity.name;
    }
    else this.listCity = { id: null, name: null , deleted:null };
  }
  getData(){
    this.listCity = this.cityService.getById(this.id);
  }
  save() {
    this.isClickOnSaveBtn=true;
    if(this.listCity.name===null || this.listCity.name=== ''){
      return
    }
    if (this.id) {
      const resualt = this.cityService.update(this.listCity);
      if (resualt)
      this.toastrService.success('update succesfull');
      else
      this.toastrService.error('update failed','sorry!');
     } 
     else{
      this.cityService.create(this.listCity);
      this.toastrService.success('the new city create succesfully','success');

    }
    this.navigate();
  }
  navigate() {
    this.router.navigate([this.id ? '../..' : '..'], {
			relativeTo: this.activatedRoute,
		});
  }
  cancel() {
    this.listCity.name=this.orginalName;
    this.navigate();
  }
  
}

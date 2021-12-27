import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityModel } from '../../../core/models/city.model';
import { CityService } from '../../../core/services/city.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  orginalName:any;
  listCity: CityModel;

  @Input() id: any;
  constructor(
    private cityService: CityService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
      if (this.id) {
        this.cityService.update(this.listCity);
      } else this.cityService.create(this.listCity);
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

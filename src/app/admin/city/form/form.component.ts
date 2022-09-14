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
  orginalName: any;
  city: CityModel;
  listCity: CityModel[];
  isClickOnSaveBtn = false;
  constructor(
    private cityService: CityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.city = this.cityService.getById(this.id);
    this.listCity = this.cityService.getData();
    this.orginalName = this.city.name;
  }
  save() {
    this.isClickOnSaveBtn = true;
    if (this.city.name === null || this.city.name === '') {
      return
    }
    if (this.id) {
      this.update();
    }
    else {
      this.create();
    }
    this.navigate();
  }
  navigate() {
    this.router.navigate([this.id ? '../..' : '..'], {
      relativeTo: this.activatedRoute,
    });
  }
  update() {
    const resualt = this.cityService.update(this.city);
    resualt ? this.toastrService.success('update succesfull') : this.toastrService.error('update failed', 'sorry!');
  }
  create() {
    debugger
    if ( ! this.listCity.find((item: any) => item.name === this.city.name)) {
      this.cityService.create(this.city);
      this.toastrService.success('the new city create succesfully', 'success');
    }
    else this.toastrService.error('This city is already registered');
  }
  cancel() {
    this.city.name = this.orginalName;
    this.navigate();
  }

}

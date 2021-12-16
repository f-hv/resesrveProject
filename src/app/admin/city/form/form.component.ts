import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityModel } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // listCity: CityModel[] = [];
  listCity: CityModel;
  @Input() id: any;
  constructor(
    private cityService: CityService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.id) this.listCity = this.cityService.getById(this.id);
  }
  save() {
    console.log(this.listCity);
      if (this.id) {
        this.cityService.update(this.listCity);
      } else this.cityService.create(this.listCity);
    this.navigate();
  }
  navigate() {
    this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
  }
  cancel() {
    this.navigate();
  }
}

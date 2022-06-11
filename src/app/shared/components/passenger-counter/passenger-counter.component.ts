import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-passenger-counter',
  templateUrl: './passenger-counter.component.html',
  styleUrls: ['./passenger-counter.component.scss']
})
export class PassengerCounterComponent implements OnInit {
  @Output() CalculateCountPassenger = new EventEmitter();
  countPassenger = { adultCount: 1, childCount: 0, babyCount: 0 }
  isClickOnAddAdult:Boolean=true;
  navbarOpen:Boolean=false;
  sumNemberPassenger:number=1;
  constructor() { }
  ngOnInit(): void { }
  adultAdd() {   
    this.isClickOnAddAdult=false;
    this.countPassenger.adultCount += 1;
    this.sumNemberPassenger+=1;
    this.CalculateCountPassenger.emit(this.countPassenger);
  }
  adultLow() {
    this.countPassenger.adultCount -= 1
    this.sumNemberPassenger-=1;
    this.CalculateCountPassenger.emit(this.countPassenger);
  }
  childAdd() {
    this.countPassenger.childCount += 1
    this.sumNemberPassenger+=1;
    this.CalculateCountPassenger.emit(this.countPassenger);
  }
  childLow() {
    this.countPassenger.childCount -= 1
    this.sumNemberPassenger-=1;
    this.CalculateCountPassenger.emit(this.countPassenger);
  }
  babyAdd() {
    this.countPassenger.babyCount += 1
    this.sumNemberPassenger+=1;
    this.CalculateCountPassenger.emit(this.countPassenger);
  }
  babyLow() {
    this.countPassenger.babyCount -= 1
    this.sumNemberPassenger-=1;
    this.CalculateCountPassenger.emit(this.countPassenger);
  }
  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;

  }

}

import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
const left = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ opacity: 0, }), animate("200ms ease-in-out", style({ opacity: 1, }))],
      { optional: true, }),
    query(':leave', [style({ opacity: 1, transform: "translateX(100)" }), animate("200ms ease-in-out", style({ opacity: 0, transform: "translateX(-10%)" }))],
      { optional: true, }),]),
];

const right = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ opacity: 0 }), animate("200ms ease-in-out", style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ opacity: 1, transform: "translateX(-100)" }), animate("200ms ease-in-out", style({ transform: 'translateX(10%)', opacity: 0 }))], {
      optional: true,
    }),
  ]),
];
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  @Input() id: number;
  counter: number = 0;
  firstListImage: any = [
    'assets/pic/kish.jpg',
    'assets/pic/nava.jpg',
    'assets/pic/AQ.jpg',
    'assets/pic/gilan.jpg',
    'assets/pic/olesblangah.jpg',
    'assets/pic/Sahel.jpg',
    'assets/pic/mesr.jpg',
    'assets/pic/maxer.jpg',
  ];
  secondListImage: any = [
    'assets/pic/hotel-1.jpg',
    'assets/pic/hotel-2.jpg',
    'assets/pic/hotel-3.jpg',
    'assets/pic/hotel-4.jpg',
    'assets/pic/hotel-5.jpg'
  ];
  images = [];


  constructor() { }

  ngOnInit() {
    this.id == 1 ? this.images = this.firstListImage : this.images = this.secondListImage;
    console.log(this.images);
    
  }

  onNext() {
    if (this.counter != this.images.length - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
const left = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ opacity: 0,}),animate("200ms ease-in-out",style({ opacity: 1,}))],
     { optional: true, }),
    query(':leave', [style({ opacity: 1, transform: "translateX(100)" }),animate("200ms ease-in-out",style({ opacity: 0, transform: "translateX(-10%)" }))],
    {optional: true,}),]),
  ];

const right = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ opacity: 0}), animate("200ms ease-in-out", style({ transform: 'translateX(0%)' }))], {
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
  counter: number = 0;
  images = [
    'assets/pic/gilan.jpg',
    'assets/pic/olesblangah.jpg',
    'assets/pic/kish.jpg',
    'assets/pic/maxer.jpg',
    'assets/pic/Sahel.jpg',
    'assets/pic/mesr.jpg',
  ];


  constructor() { }

  ngOnInit() {
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

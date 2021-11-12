import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass']
})
export class CardsComponent implements OnInit {
  @Input() img: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() description: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

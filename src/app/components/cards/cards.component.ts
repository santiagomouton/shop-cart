import { Component, Input, OnInit } from '@angular/core';
import { Product, initialProduct } from '../../models/product.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass']
})
export class CardsComponent implements OnInit {
  @Input() product: Product;

  constructor() {
    this.product = initialProduct;
  }

  ngOnInit(): void {
  }

}

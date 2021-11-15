import { Component, Input, OnInit } from '@angular/core';
import { Product, initialProduct } from '../../models/product.model';
import { Cart } from '../../models/cart.mode';
import { Store } from '@ngrx/store';
import { IStates } from 'src/app/redux/reducers';
import { addProductToCart } from '../../redux/actions/cart.actions';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass']
})
export class CardsComponent implements OnInit {
  @Input() product: Product;
  @Input() cart!: Cart

  constructor( private cartStore: Store<IStates> ) {
    this.product = initialProduct;
  }

  ngOnInit(): void {
  }

  add() {
/*     const clone = { 
      cart: Object.assign({}, this.cart),
      product: Object.assign({}, this.product)
    }; */
    this.cartStore.dispatch(addProductToCart({cart: this.cart, product: this.product}))
  }

}

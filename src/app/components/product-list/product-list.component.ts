import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.mode';
import { Product } from 'src/app/models/product.model';
import { IStates } from 'src/app/redux/reducers';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';
import { loadCart } from '../../redux/actions/cart.actions';
import { getProducts } from '../../redux/actions/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  cartObs: Subscription;
  productObs: Subscription;
  cart!: Cart;

  constructor( public notify: NotifyService, private cartStore: Store<IStates>, private productStore: Store<IStates> ) {
    productStore.dispatch(getProducts())
    cartStore.dispatch(loadCart())
    this.cartObs = this.cartStore.select('cartReducer').subscribe( res => {
      if(res.cart != null) {
        this.cart = res.cart;
      }
    })
    this.productObs = this.cartStore.select('productReducer').subscribe( res => {
      if(res.products != null) {
        this.products = res.products;
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.cartObs.unsubscribe()
    this.productObs.unsubscribe()
  }

}

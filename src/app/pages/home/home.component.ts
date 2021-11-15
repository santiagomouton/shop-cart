import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.mode';
import { Product } from 'src/app/models/product.model';
import { IStates } from 'src/app/redux/reducers';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';
import { loadCart } from '../../redux/actions/cart.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  cartObs: Subscription;
  cart!: Cart;
  
  constructor( private productService:ProductService, public notify: NotifyService, private cartStore: Store<IStates> ) {
    cartStore.dispatch(loadCart())
    this.cartObs = this.cartStore.select('cartReducer').subscribe( res => {
      if(res.cart != null) {
        this.cart = res.cart;
      }
    })
  }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

  ngOnDestroy(): void {
    this.cartObs.unsubscribe()
  }

}

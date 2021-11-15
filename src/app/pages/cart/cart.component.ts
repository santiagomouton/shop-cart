import { Component, OnDestroy, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IStates } from 'src/app/redux/reducers';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { loadCart, newCart } from '../../redux/actions/cart.actions';
import { ProductService } from '../../services/product.service';
import { Cart } from '../../models/cart.mode';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit, OnDestroy {

  cartObs: Subscription;
  cart!: Cart;

  constructor( public notify: NotifyService, private cartStore: Store<IStates>, private auth: AuthService ) {
    cartStore.dispatch(loadCart())
    this.cartObs = this.cartStore.select('cartReducer').subscribe( res => {
      if(res.cart != null) {
        this.cart = res.cart;
      }
    })
    
  }
  
  ngOnInit(): void {
    this.auth.checkAuth().subscribe( res => console.log(res.uid))
  }
  
  ngOnDestroy(): void {
    this.cartObs.unsubscribe()
  }

}

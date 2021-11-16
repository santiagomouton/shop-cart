import { Component, OnDestroy, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IStates } from 'src/app/redux/reducers';
import { NotifyService } from 'src/app/services/notify.service';
import { loadCart, newCart, reduceProductFromCart, addProductToCart, buyProductsFromCart } from '../../redux/actions/cart.actions';
import { Cart } from '../../models/cart.mode';
import { Product } from '../../models/product.model';
import { getProducts } from '../../redux/actions/product.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit, OnDestroy {

  private cartObs: Subscription;
  private productsObs: Subscription;
  cart!: Cart;
  products: Product[] = []
  loading: boolean = true;

  constructor( public notify: NotifyService, private cartStore: Store<IStates>, private productStore: Store<IStates> ) {
    cartStore.dispatch(loadCart())
    productStore.dispatch(getProducts())
    this.cartObs = this.cartStore.select('cartReducer').subscribe( res => {
      if(res.cart != null) {
        this.cart = res.cart;
      }
    })    
    this.productsObs = this.cartStore.select('productReducer').subscribe( res => {
      if(res.products.length > 0 && this.cart?.products) {
        this.products = res.products.filter( pr => this.cart.products[pr.id] > 0);
        this.loading = false;
      }
    })
  }
  
  ngOnInit(): void {
  }

  
  increaseQuantity( product: Product) {
    if( this.cart.products[product.id] >= 100 ) {     // Limite por stock o por algun otro motivo
      this.notify.warningNotification('', 'No se puede agregar mas')
    } else {
      this.cartStore.dispatch(addProductToCart({cart: this.cart, product: product}))
    }
  }
  
  decreaseQuantity( product: Product) {
    this.cartStore.dispatch(reduceProductFromCart({cart: this.cart, product: product}))
  }

  buy() {
    this.notify.confirmBox().subscribe( res => {
      if( res.Success ) {
        console.log('acepto');
        this.cartStore.dispatch(buyProductsFromCart({cart: this.cart}))
      }
    })
  }
  
  ngOnDestroy(): void {
    this.cartObs.unsubscribe()
    this.productsObs.unsubscribe()
  }

}

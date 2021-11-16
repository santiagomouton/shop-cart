import { Component, OnDestroy, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IStates } from 'src/app/redux/reducers';
import { NotifyService } from 'src/app/services/notify.service';
import {
  loadCart,
  newCart,
  reduceProductFromCart,
  addProductToCart,
  buyProductsFromCart,
} from '../../redux/actions/cart.actions';
import { Cart } from '../../models/cart.mode';
import { Product } from '../../models/product.model';
import { getProducts } from '../../redux/actions/product.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit, OnDestroy {
  private cartObs: Subscription;
  private productsObs: Subscription;
  cart!: Cart;
  products: Product[] = [];
  loading: boolean = true;

  constructor(
    public notify: NotifyService,
    private store: Store<IStates>
  ) {
    // Dispatch para cargar el carrito de compras y dispach para obtener todos los productos disponibles
    store.dispatch(loadCart());
    store.dispatch(getProducts());

    this.cartObs = this.store.select('cartReducer').subscribe((res) => {
      if (res.cart != null) {
        this.cart = res.cart;
      }
    });
    // Suscripcion al store de productos, toma unicamente los que se identifican con el carrito
    this.productsObs = this.store
      .select('productReducer')
      .subscribe((res) => {
        if (res.products.length > 0 && this.cart?.products) {
          this.products = res.products.filter(
            (pr) => this.cart.products[pr.id] > 0
          );
          this.loading = false;
        }
      });
  }

  ngOnInit(): void {}

  /**
   * Verifica que la cantidad de productos no sea mayor al limite y realiza 
   * una accion sobre el store para incrementar en uno la cant del producto
   * @param product 
   */
  increaseQuantity(product: Product) {
    if (this.cart.products[product.id] >= 100) {
      // Limite por stock o por algun otro motivo
      this.notify.warningNotification('', 'No se puede agregar mas');
    } else {
      this.store.dispatch(
        addProductToCart({ cart: this.cart, product: product })
      );
    }
  }

  /**
   * Realiza una accion sobre el store para decrementar en uno la cant del producto
   * @param product 
   */
  decreaseQuantity(product: Product) {
    this.store.dispatch(
      reduceProductFromCart({ cart: this.cart, product: product })
    );
  }

  /**
   * Realiza la accion de comprar en el store
   */
  buy() {
    this.notify.confirmBox().subscribe((res) => {
      if (res.Success) {
        this.store.dispatch(buyProductsFromCart({ cart: this.cart }));
        this.products = []; // Carrito vacio por compra realizada
        this.notify.successNotification(
          'Operacion terminada',
          'Compra realizada con exito!'
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.cartObs.unsubscribe();
    this.productsObs.unsubscribe();
  }
}

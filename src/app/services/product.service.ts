import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat'
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Cart } from '../models/cart.mode';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private userID : string = ''; 

  constructor( private firestore: AngularFirestore, private auth: AuthService ) {
    auth.checkAuth().subscribe( user => {this.userID = user.uid });
  }

  public getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  public async addProduct( product: Product ) {
    return await this.firestore.collection('products').add(product);
  }

  public async updateProduct( product: Product ) {
    return await this.firestore.collection('products').doc(product.id).update(product);
  }

  public loadCart(): Observable<Cart> {
    return this.firestore.collection('users').doc(this.userID).collection('carts').snapshotChanges()
      .pipe( 
        filter((cart:any) => cart.payload.doc.data()['pending'] == true), // Filtro: solo el carrito en estado pendiente
        take(1),                                                          // toma el primer valor
        map((doc) => {                                                    // arreglo el retorno para que contenga el id del elemento
          const data = doc[0].payload.data();
          const id = doc[0].payload.id || '-1';
          return { id, ...data };
        })
      ) 
 /*   
      .subscribe(res => { 
        if(res[0]) {
          let cart: Cart = {
            id: res[0].payload.doc.id,
            ... res[0].payload.doc.data()
          }
          return cart
        } else {
          return this.newCart();
        }
      }, error => {}
    ) */
  }

  public async newCart() {
    let cart: Cart = {
      pending:     true,
      products:    {}
    }
    await this.firestore.collection('users').doc(this.userID).collection('carts').add(cart);
  }

  public async addProductToCart( cart: Cart, product: Product ) {
    cart.products[product.id] += 1;
    await this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id).update(cart);
  }

  public async reduceProductFromCart( cart: Cart, product: Product ) {
    if(cart.products[product.id] <= 0) {
      return;
    }
    cart.products[product.id] -= 1;
    await this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id).update(cart);
  }

  public async deleteProductToCart( cart: Cart, product: Product ) {
    cart.products[product.id] = 0;
    await this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id).update(cart);
  }

  public async buyProductsFromCart( cart: Cart ) {
    cart.pending = false;
    await this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id).update(cart)
/*     .then( res => {
      this.loadCart()  // Si se compro con exito cargo un nuevo carrito de compras
      return true;
    })
    .catch(err => {return false}) */
  }


}

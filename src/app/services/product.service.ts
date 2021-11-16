import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Cart } from '../models/cart.mode';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import firebase from '@firebase/app-compat'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private userID : string = ''; 

  constructor( private firestore: AngularFirestore, private auth: AuthService ) {
    auth.checkAuth().subscribe( user => {this.userID = user?.uid });
  }

  public getProducts(): Observable<Product[]> {
    return this.firestore.collection('products').snapshotChanges().pipe( map( (doc) => {
      return doc.map( (product: any) => {
        const id = product.payload.doc.id;
        const data = product.payload.doc.data();
        return {id, ...data}
      })
    }));
  }

  public async addProduct( product: Product ): Promise<void> {
    await this.firestore.collection('products').add(product);
  }

  public async updateProduct( product: Product ): Promise<void> {
    return await this.firestore.collection('products').doc(product.id).update(product);
  }

  public loadCart(): Observable<Cart> {
    // QUERY: solo el carrito en estado pendiente
    return this.firestore.collection(`users/${this.userID}/carts`,(ref)=>ref.where("pending", "==", true)).snapshotChanges().
      pipe( take(1), map( (doc:any) => {
          const id = doc[0].payload.doc.id;         // toma el primer valor
          const data = doc[0].payload.doc.data();   // arreglo el retorno para que contenga el id del elemento
          return {id, ...data}
      }));
  }

  public async newCart(): Promise<void> {
    let cart: Cart = {
      pending:     true,
      products:    {}
    }
    await this.firestore.collection('users').doc(this.userID).collection('carts').add(cart);
  }

  public async addProductToCart( cart: Cart, product: Product ): Promise<void> {
    return this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id)
      .set({"products": {[product.id]: firebase.firestore.FieldValue.increment(1) }}, {merge: true});
  }

  public async reduceProductFromCart( cart: Cart, product: Product ): Promise<void> {
    if( cart.products[product.id] == 0 ) return
    return this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id)
      .set({"products": {[product.id]: firebase.firestore.FieldValue.increment(-1) }}, {merge: true});
  }

  public async deleteProductToCart( cart: Cart, product: Product ): Promise<void> {
    return this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id)
      .set({"products": {[product.id]: 0 }}, {merge: true});
  }

  public async buyProductsFromCart( cart: Cart ): Promise<void> {
    return this.firestore.collection('users').doc(this.userID).collection('carts').doc(cart.id)
      .set({"pending": false }, {merge: true});
  }


}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Cart } from '../models/cart.mode';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private userID: string = '';

  decrement = firebase.firestore.FieldValue.increment(-1);
  increment = firebase.firestore.FieldValue.increment(1);

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    // Suscripcion para obtener siempre el UID del usuario actual
    auth.checkAuth().subscribe((user) => {
      this.userID = user?.uid;
    });
  }

  /**
   * Peticion a firebase y arreglo de retorno para obtener el id.
   * @returns Array de productos
   */
  public getProducts(): Observable<Product[]> {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return doc.map((product: any) => {
            const id = product.payload.doc.id;
            const data = product.payload.doc.data();
            return { id, ...data };
          });
        })
      );
  }
  
  // Metodos que solo se realizan con exito para el usuario administrador.
  public async addProduct(product: Product): Promise<void> {
    await this.firestore.collection('products').add(product);
  }

  public async updateProduct(product: Product): Promise<void> {
    return await this.firestore
      .collection('products')
      .doc(product.id)
      .update(product);
  }
  //************* */

  /**
   * Peticion y filtrado a firebase de solo los carritos pendientes;
   * arreglo de retorno para obtener un unico resultado y el id.
   * @returns Carro unico pendiente
   */
  public loadCart(): Observable<Cart> {
    // QUERY: solo el carrito en estado pendiente
    return this.firestore
      .collection(`users/${this.userID}/carts`, (ref) =>
        ref.where('pending', '==', true)
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map((doc: any) => {
          const id = doc[0].payload.doc.id; // toma el primer valor
          const data = doc[0].payload.doc.data(); // arreglo el retorno para que contenga el id del elemento
          return { id, ...data };
        })
      );
  }

  public async newCart(): Promise<void> {
    let cart: Cart = {
      pending: true,
      products: {},
    };
    await this.firestore
      .collection('users')
      .doc(this.userID)
      .collection('carts')
      .add(cart);
  }

  public async addProductToCart(cart: Cart, product: Product): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(this.userID)
      .collection('carts')
      .doc(cart.id)
      .set({ products: { [product.id]: this.increment } }, { merge: true });
  }

  public async reduceProductFromCart(
    cart: Cart,
    product: Product
  ): Promise<void> {
    if (cart.products[product.id] == 0) return;
    return this.firestore
      .collection('users')
      .doc(this.userID)
      .collection('carts')
      .doc(cart.id)
      .set({ products: { [product.id]: this.decrement } }, { merge: true });
  }

  public async deleteProductToCart(
    cart: Cart,
    product: Product
  ): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(this.userID)
      .collection('carts')
      .doc(cart.id)
      .set({ products: { [product.id]: 0 } }, { merge: true });
  }

  /**
   * Cambia el estado del carrito de compras a no pendiente y realiza la peticion de cambio a firebase.
   * @param cart Carro en estado pendiente
   * @returns void
   */
  public async buyProductsFromCart(cart: Cart): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(this.userID)
      .collection('carts')
      .doc(cart.id)
      .set({ pending: false }, { merge: true });
  }
}

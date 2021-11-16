import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as productActions from '../actions/product.actions';

@Injectable()
export class ProductEffect {

    loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.getProducts),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          map((products) => productActions.getProductsSuccess({ products })),
          catchError((error) => of(productActions.getProductsError({ error })))
        );
      })
    );
  });


  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}

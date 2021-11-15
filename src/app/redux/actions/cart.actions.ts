import { createAction, props } from "@ngrx/store"
import { Cart } from "src/app/models/cart.mode"
import { Product } from "src/app/models/product.model"

export const loadCart       = createAction('[GET] Get Cart')
export const loadCartSuccess= createAction('[GET] Get Cart Success', props<{cart: Cart}>())
export const loadCartError  = createAction('[GET] Get Cart Failure', props<{error: any}>())

export const newCart        = createAction('[POST] New Cart')
export const newCartSuccess = createAction('[POST] New Cart Success')
export const newCartError   = createAction('[POST] New Cart Failure', props<{error: any}>())

export const addProductToCart          = createAction('[PUT] Add Product to cart', props<{cart: Cart, product: Product}>())
export const addProductToCartSuccess   = createAction('[PUT] Add Product to cart Success')
export const addProductToCartError     = createAction('[PUT] Add Product to cart Failure', props<{error: any}>())

export const reduceProductFromCart       = createAction('[DELETE] Delete Product from cart', props<{cart: Cart, product: Product}>())
export const reduceProductFromCartSuccess= createAction('[DELETE] Delete Product from cart Success')//, props<{cart: Cart}>())
export const reduceProductFromCartError  = createAction('[DELETE] Delete Product from cart Failure', props<{error: any}>())

export const deleteProductFromCart       = createAction('[DELETE] Delete Product from cart', props<{cart: Cart, product: Product}>())
export const deleteProductFromCartSuccess= createAction('[DELETE] Delete Product from cart Success')//, props<{cart: Cart}>())
export const deleteProductFromCartError  = createAction('[DELETE] Delete Product from cart Failure', props<{error: any}>())

export const buyProductsFromCart       = createAction('[DELETE] Buy Products', props<{cart: Cart}>())
export const buyProductsFromCartSuccess= createAction('[DELETE] Buy Products Success')
export const buyProductsFromCartError  = createAction('[DELETE] Buy Products Failure', props<{error: any}>())



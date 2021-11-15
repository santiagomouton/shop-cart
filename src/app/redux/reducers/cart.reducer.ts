import { createReducer, on } from "@ngrx/store"
import * as actions from '../actions/cart.actions'
import { Product } from "../../models/product.model"
import { Cart } from "../../models/cart.mode"

export interface CartState {
    cart: Cart | null,
    error: any
}

const initialState: CartState = {
    cart: null,
    error: null,
}

export const cartReducer = createReducer(initialState,
    /*STATES FOR LOAD CART */
    on(actions.loadCart, (state, action) => ({ cart: null, error: null })),
    on(actions.loadCartSuccess, (state, action) => ({ cart: action.cart, error: null })),
    on(actions.loadCartError, (state, action) => ({ cart: state.cart, error: action.error })),
    /*STATES FOR NEW CART */
    on(actions.newCart, (state, action) => ({ cart: null, error: null })),
    on(actions.newCartSuccess, (state, action) => ({ ...state })),
    on(actions.newCartError, (state, action) => ({ cart: null, error: action.error })),
    /*STATES FOR ADD PRODUCT */
    on(actions.addProductToCart, (state, action) => ({ ...state })),
    on(actions.addProductToCartSuccess, (state, action) => ({ ...state })),
    on(actions.addProductToCartError, (state, action) => ({ cart: state.cart, error: action.error })),
    /*STATES FOR DELETE PRODUCT */
    on(actions.deleteProductFromCart, (state, action) => ({ cart: state.cart, error: null })),
    on(actions.deleteProductFromCartSuccess, (state, action) => ({ ...state, error: null })),
    on(actions.deleteProductFromCartError, (state, action) => ({ cart: state.cart, error: action.error })),
    /*STATES FOR REDUCE PRODUCT */
    on(actions.reduceProductFromCart, (state, action) => ({ cart: state.cart, error: null })),
    on(actions.reduceProductFromCartSuccess, (state, action) => ({ ...state, error: null })),
    on(actions.reduceProductFromCartError, (state, action) => ({ cart: state.cart, error: action.error })),
    /*STATES FOR BUY PRODUCT */
    on(actions.buyProductsFromCart, (state, action) => ({ cart: state.cart, error: null })),
    on(actions.buyProductsFromCartSuccess, (state, action) => ({ cart: null, error: null })),
    on(actions.buyProductsFromCartError, (state, action) => ({ cart: state.cart, error: action.error }))


)
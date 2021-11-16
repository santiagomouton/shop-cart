import { createReducer, on } from "@ngrx/store"
import * as actions from '../actions/product.actions'
import { Product } from "../../models/product.model"

export interface ProductState {
    products: Product[],
    error: any
}

const initialState: ProductState = {
    products: [],
    error: null,
}

/**
 *  PARA FUTURAS IMPLEMENTACIONES DE ADMINISTRACIONES DE PRODUCTOS ADITAR ESTE REDUCER, Y AGREGAR LOS EFFECTS CORRESPONDIENTES
 */
export const productReducer = createReducer(initialState,
    /*STATES FOR LOAD PRODUCTS */
    on(actions.getProducts, (state, action) => ({ ...state })),
    on(actions.getProductsSuccess, (state, action) => ({ products: action.products, error: null })),
    on(actions.getProductsError, (state, action) => ({ ...state, error: action.error }))

)
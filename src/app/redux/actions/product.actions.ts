import { createAction, props } from "@ngrx/store"
import { Product } from "src/app/models/product.model"

export const getProducts = createAction('[GET] Get Products')
export const getProductsSuccess = createAction('[GET] Get Products Success', props<{products: Product[]}>())
export const getProductsError = createAction('[GET] Get Products Failure', props<{error: any}>())

export const addProducts = createAction('[POST] Add Product', props<{product: Product}>())
export const addProductsSuccess = createAction('[POST] Add Product Success')
export const addProductsError = createAction('[POST] Add Product Failure', props<{error: any}>())

export const updateProduct = createAction('[PUT] Update Product', props<{product: Product}>())
export const updateProductSuccess = createAction('[PUT] Update Product Success')
export const updateProductError = createAction('[PUT] Update Product Failure', props<{error: any}>())



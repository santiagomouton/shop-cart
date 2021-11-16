import { authReducer, AuthState } from './auth.reducer';
import { cartReducer, CartState } from './cart.reducer';
import { productReducer, ProductState } from './product.reducer';

/**
 * Agregar aca los reducers para importarlo en el modulo
 */
export const reducers = {
  authReducer,
  cartReducer,
  productReducer
};

/**
 * Agregando el reducer y la interface se puede utilizar luego en el componente **** ( public store: Store<IStates> ) 
 */
export interface IStates{
  authReducer: AuthState;
  cartReducer: CartState;
  productReducer: ProductState;
}
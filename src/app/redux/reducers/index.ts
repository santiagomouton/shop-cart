import { authReducer, AuthState } from './auth.reducer';
import { cartReducer, CartState } from './cart.reducer';

/**
 * Agregar aca los reducers para importarlo en el modulo
 */
export const reducers = {
  authReducer,
  cartReducer,
};

/**
 * Agregando el reducer y la interface se puede utilizar luego en el componente **** ( public store: Store<IStates> ) 
 */
export interface IStates{
  authReducer: AuthState;
  cartReducer: CartState
}
import { Product } from './product.interface';

// Estructura base de un item dentro del carrito.
export interface CartItem {
  product: Product;
  quantity: number;
}

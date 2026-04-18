import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.interface';

// Servicio base para el estado del carrito.
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Estado reactivo inicial del carrito.
  readonly items = signal<CartItem[]>([]);
}

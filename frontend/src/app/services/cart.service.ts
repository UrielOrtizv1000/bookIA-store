import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.interface';
import { Product } from '../models/product.interface';

// Servicio para el estado local del carrito.
@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly totalItems = computed(() =>
    this.items().reduce((total, item) => total + item.cantidad, 0),
  );
  readonly totalAmount = computed(() =>
    this.items().reduce((total, item) => total + this.getItemSubtotal(item), 0),
  );

  addProduct(product: Product): void {
    if (!product.disponible || product.stock <= 0) {
      return;
    }

    this.items.update((items) => {
      const existingItem = items.find((item) => item.producto.id === product.id);

      if (!existingItem) {
        return [...items, { producto: product, cantidad: 1 }];
      }

      return items.map((item) => {
        if (item.producto.id !== product.id) {
          return item;
        }

        return {
          ...item,
          cantidad: Math.min(item.cantidad + 1, product.stock),
        };
      });
    });
  }

  increaseQuantity(productId: number): void {
    this.items.update((items) =>
      items.map((item) => {
        if (item.producto.id !== productId) {
          return item;
        }

        return {
          ...item,
          cantidad: Math.min(item.cantidad + 1, item.producto.stock),
        };
      }),
    );
  }

  decreaseQuantity(productId: number): void {
    this.items.update((items) =>
      items
        .map((item) => {
          if (item.producto.id !== productId) {
            return item;
          }

          return {
            ...item,
            cantidad: item.cantidad - 1,
          };
        })
        .filter((item) => item.cantidad > 0),
    );
  }

  removeProduct(productId: number): void {
    this.items.update((items) =>
      items.filter((item) => item.producto.id !== productId),
    );
  }

  getItemSubtotal(item: CartItem): number {
    return item.producto.precio * item.cantidad;
  }
}

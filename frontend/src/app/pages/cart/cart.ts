import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item.interface';
import { CartService } from '../../services/cart.service';

// Vista base del carrito de compras.
@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPageComponent {
  // Estado visible del carrito.
  private readonly cartService = inject(CartService);

  protected readonly items = this.cartService.items;
  protected readonly totalAmount = this.cartService.totalAmount;
  protected readonly totalItems = this.cartService.totalItems;

  protected increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item.producto.id);
  }

  protected decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item.producto.id);
  }

  protected removeItem(item: CartItem): void {
    this.cartService.removeProduct(item.producto.id);
  }

  protected getSubtotal(item: CartItem): number {
    return this.cartService.getItemSubtotal(item);
  }

  protected trackByProductId(index: number, item: CartItem): number {
    void index;
    return item.producto.id;
  }
}

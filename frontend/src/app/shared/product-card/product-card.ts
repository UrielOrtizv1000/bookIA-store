import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.interface';

// Tarjeta compartida para representar un libro en listados.
@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  // Entrada principal con los datos del libro.
  @Input()
  set product(value: Product | null) {
    this.productData = value;
    this.imageError = false;
  }

  get product(): Product | null {
    return this.productData;
  }

  // Salida para propagar el evento de agregar al carrito.
  @Output() addToCart = new EventEmitter<Product>();

  protected imageError = false;

  private productData: Product | null = null;

  protected emitAddToCart(): void {
    if (this.product && this.canAddToCart) {
      this.addToCart.emit(this.product);
    }
  }

  protected onImageError(): void {
    this.imageError = true;
  }

  protected get canAddToCart(): boolean {
    return !!this.product && this.product.disponible && this.product.stock > 0;
  }

  protected get hasCover(): boolean {
    return !!this.product?.imagen && !this.imageError;
  }
}

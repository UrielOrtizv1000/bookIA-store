import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.interface';

// Tarjeta compartida para representar un libro en listados.
@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  // Entrada y salida preparadas para integracion futura.
  @Input() product: Product | null = null;
  @Output() selectProduct = new EventEmitter<number>();
}

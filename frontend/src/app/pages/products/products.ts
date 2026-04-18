import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { Product } from '../../models/product.interface';

// Vista base del catalogo de productos.
@Component({
  selector: 'app-products-page',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsPageComponent {
  // Coleccion preparada para la futura carga del catalogo.
  protected readonly products: Product[] = [];
}

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

// Vista base del catalogo de productos.
@Component({
  selector: 'app-products-page',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsPageComponent implements OnInit {
  // Estado del catalogo y acciones locales.
  private readonly cartService = inject(CartService);
  private readonly productsService = inject(ProductsService);

  protected products: Product[] = [];
  protected isLoading = true;
  protected errorMessage = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  protected addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          error.error?.message ?? 'No fue posible cargar el catalogo de productos.';
        this.isLoading = false;
      },
    });
  }
}

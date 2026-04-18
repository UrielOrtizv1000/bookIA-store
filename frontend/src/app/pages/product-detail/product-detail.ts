import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

// Vista base para el detalle dinamico de un libro.
@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailPageComponent implements OnInit {
  // Estado del detalle seleccionado y carga remota.
  private readonly cartService = inject(CartService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);

  protected product: Product | null = null;
  protected isLoading = true;
  protected notFound = false;
  protected errorMessage = '';
  protected imageError = false;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = Number(params.get('id'));

        if (!Number.isInteger(id) || id <= 0) {
          this.isLoading = false;
          this.notFound = true;
          this.product = null;
          return;
        }

        this.loadProduct(id);
      });
  }

  protected addToCart(): void {
    if (this.product) {
      this.cartService.addProduct(this.product);
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

  private loadProduct(id: number): void {
    this.isLoading = true;
    this.notFound = false;
    this.errorMessage = '';
    this.imageError = false;

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.product = null;
        this.isLoading = false;
        this.notFound = error.status === 404;
        this.errorMessage = this.notFound
          ? ''
          : error.error?.message ?? 'No fue posible cargar el detalle del producto.';
      },
    });
  }
}

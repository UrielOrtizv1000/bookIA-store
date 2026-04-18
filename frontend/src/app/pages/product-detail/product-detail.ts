import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Vista base para el detalle dinamico de un libro.
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailPageComponent {
  // Lectura inicial del identificador enviado por la ruta.
  private readonly route = inject(ActivatedRoute);
  protected readonly productId = this.route.snapshot.paramMap.get('id');
}

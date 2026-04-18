import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Product } from '../models/product.interface';

// Servicio base para la integracion futura con el catalogo.
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Referencias internas para la conexion con la API.
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/books';

  // Operaciones preparadas para el consumo del backend.
  getProducts(): Observable<Product[]> {
    void this.http;
    void this.apiUrl;
    return EMPTY;
  }

  getProductById(id: number): Observable<Product> {
    void id;
    return EMPTY;
  }

  createProduct(product: Product): Observable<Product> {
    void product;
    return EMPTY;
  }
}

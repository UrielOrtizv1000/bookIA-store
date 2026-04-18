import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.interface';

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiProduct {
  id?: number;
  nombre?: string;
  categoria?: string;
  autor?: string;
  precio?: number;
  stock?: number;
  imagen?: string;
  descripcion?: string;
  disponible?: boolean;
  title?: string;
  genre?: string;
  author?: string;
  price?: number;
  cover?: string;
  description?: string;
  available?: boolean;
}

// Servicio para la integracion con el catalogo del backend.
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Conexion centralizada con la API de productos.
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/books';

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<ApiProduct[]> | ApiProduct[]>(this.apiUrl).pipe(
      map((response) => this.readData(response)),
      map((products) => products.map((product) => this.normalizeProduct(product))),
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<ApiResponse<ApiProduct> | ApiProduct>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response) => this.readData(response)),
        map((product) => this.normalizeProduct(product)),
      );
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http
      .post<ApiResponse<ApiProduct> | ApiProduct>(
        this.apiUrl,
        this.createProductPayload(product),
      )
      .pipe(
        map((response) => this.readData(response)),
        map((createdProduct) => this.normalizeProduct(createdProduct)),
      );
  }

  private readData<T>(response: ApiResponse<T> | T): T {
    if (
      typeof response === 'object' &&
      response !== null &&
      'data' in response
    ) {
      return response.data;
    }

    return response as T;
  }

  private normalizeProduct(product: ApiProduct): Product {
    const stock = Number(product.stock ?? 0);

    return {
      id: Number(product.id ?? 0),
      nombre: String(product.nombre ?? product.title ?? ''),
      categoria: String(product.categoria ?? product.genre ?? ''),
      autor: String(product.autor ?? product.author ?? ''),
      precio: Number(product.precio ?? product.price ?? 0),
      stock,
      imagen: String(product.imagen ?? product.cover ?? ''),
      descripcion: String(product.descripcion ?? product.description ?? ''),
      disponible: Boolean(product.disponible ?? product.available ?? stock > 0),
    };
  }

  private createProductPayload(product: Omit<Product, 'id'>): Record<string, unknown> {
    return {
      stock: product.stock,
      title: product.nombre,
      genre: product.categoria,
      author: product.autor,
      price: product.precio,
      cover: product.imagen,
      description: product.descripcion,
    };
  }
}

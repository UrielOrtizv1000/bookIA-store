// Estructura base de un producto recibido desde la API.
export interface Product {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  stock: number;
  cover: string;
  description: string;
  available: boolean;
}

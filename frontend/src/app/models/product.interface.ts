// Estructura base de un producto recibido desde la API.
export interface Product {
  id: number;
  nombre: string;
  categoria: string;
  marca: string;
  precio: number;
  stock: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
}

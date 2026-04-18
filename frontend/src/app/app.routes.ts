import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { ProductsPageComponent } from './pages/products/products';
import { ProductDetailPageComponent } from './pages/product-detail/product-detail';
import { AddProductPageComponent } from './pages/add-product/add-product';
import { CartPageComponent } from './pages/cart/cart';
import { ContactPageComponent } from './pages/contact/contact';

// Definicion principal de rutas del frontend.
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'productos',
    component: ProductsPageComponent,
  },
  {
    path: 'agregar-producto',
    component: AddProductPageComponent,
  },
  {
    path: 'productos/:id',
    component: ProductDetailPageComponent,
  },
  {
    path: 'carrito',
    component: CartPageComponent,
  },
  {
    path: 'contacto',
    component: ContactPageComponent,
  },
];

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
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'products/new',
    component: AddProductPageComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
];

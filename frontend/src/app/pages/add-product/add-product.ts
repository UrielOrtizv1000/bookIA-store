import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Vista base para el alta de libros.
@Component({
  selector: 'app-add-product-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProductPageComponent {
  // Punto de preparacion para el formulario reactivo futuro.
}

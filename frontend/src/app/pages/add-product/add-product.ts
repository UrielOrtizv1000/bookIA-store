import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';

// Vista base para el alta de libros.
@Component({
  selector: 'app-add-product-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProductPageComponent {
  // Formulario reactivo y estado de guardado.
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly productsService = inject(ProductsService);

  protected isSubmitting = false;
  protected isSubmitted = false;
  protected successMessage = '';
  protected errorMessage = '';

  protected readonly productForm = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imagen: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    disponible: [false],
  });

  constructor() {
    this.productForm.controls.stock.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((stock) => {
        this.productForm.controls.disponible.setValue(Number(stock) > 0, {
          emitEvent: false,
        });
      });
  }

  protected get availablePreview(): boolean {
    return Boolean(this.productForm.controls.disponible.value);
  }

  protected isInvalid(controlName: keyof typeof this.productForm.controls): boolean {
    const control = this.productForm.controls[controlName];
    return control.invalid && (control.touched || this.isSubmitted);
  }

  protected submitForm(): void {
    this.isSubmitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const rawValue = this.productForm.getRawValue();
    const disponible = Number(rawValue.stock) > 0;
    const payload: Omit<Product, 'id'> = {
      nombre: rawValue.nombre.trim(),
      categoria: rawValue.categoria.trim(),
      marca: rawValue.marca.trim(),
      precio: Number(rawValue.precio),
      stock: Number(rawValue.stock),
      imagen: rawValue.imagen.trim(),
      descripcion: rawValue.descripcion.trim(),
      disponible,
    };

    this.isSubmitting = true;

    this.productsService.createProduct(payload).subscribe({
      next: (product) => {
        this.successMessage = `El producto "${product.nombre}" se guardo correctamente.`;
        this.isSubmitting = false;
        this.isSubmitted = false;
        this.productForm.reset({
          nombre: '',
          categoria: '',
          marca: '',
          precio: 0,
          stock: 0,
          imagen: '',
          descripcion: '',
          disponible: false,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          error.error?.message ?? 'No fue posible guardar el producto.';
        this.isSubmitting = false;
      },
    });
  }
}

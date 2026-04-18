import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Vista base para el contacto con la tienda.
@Component({
  selector: 'app-contact-page',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactPageComponent {
  // Punto de preparacion para el formulario basado en plantilla.
}

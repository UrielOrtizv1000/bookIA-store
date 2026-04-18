import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Encabezado y navegacion principal del sitio.
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  // Componente base del encabezado.
}

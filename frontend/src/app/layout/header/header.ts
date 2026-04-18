import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

// Encabezado y navegacion principal del sitio.
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  // Estado minimo compartido del encabezado.
  private readonly cartService = inject(CartService);

  protected readonly cartCount = this.cartService.totalItems;
  protected readonly exactLinkOptions = { exact: true };
}

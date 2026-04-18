import { RenderMode, ServerRoute } from '@angular/ssr';

// Configuracion SSR compatible con rutas dinamicas.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];

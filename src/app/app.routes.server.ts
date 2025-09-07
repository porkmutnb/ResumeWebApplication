import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // This route has a dynamic parameter, so we render it on the server on-demand.
    path: 'portfolio/detail/:id',
    renderMode: RenderMode.Server,
  },
  {
    // This is a wildcard route to catch all other routes and prerender them.
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

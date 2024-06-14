import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./views/pages/authentication/auth.routes').then(c => c.AUTH_ROUTES),
      },
      {
        path: '',
        loadChildren: () => import('./views/layout/layout.routes').then(c => c.LAYOUT_ROUTES),
      },
    ],
  },

];

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('../pages/search-profesional/search-professional.routes').then(c => c.SEARCH_PROFESSIONAL_ROUTES),
      } ,
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.routes').then(c => c.HOME_ROUTES),
      },
      {
        path: 'page-not-found',
        loadComponent: () =>
          import('../common/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/page-not-found'
      },
    ]
  }
];

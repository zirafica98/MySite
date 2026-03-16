import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./components/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/new',
    loadComponent: () => import('./components/admin/blog-editor/blog-editor.component').then(m => m.BlogEditorComponent)
  },
  {
    path: 'admin/edit/:id',
    loadComponent: () => import('./components/admin/blog-editor/blog-editor.component').then(m => m.BlogEditorComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

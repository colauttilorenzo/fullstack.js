// ---------------- libraries ---------------
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
// ---------------- libraries ---------------


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'product',
    loadChildren: () => import('@modules/product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'authorization',
    loadChildren: () => import('@modules/authorization/authorization.module').then(m => m.LoginModule),
  },
  { path: 'login/*', redirectTo: '/authorization/signin', pathMatch: 'full' },
  { path: '', redirectTo: '/authorization/signin', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: '/authorization/signin',
  }
];

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false, preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ],
})
export class RoutingModule {

  constructor() { }
}
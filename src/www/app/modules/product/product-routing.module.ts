// ---------------- libraries ---------------
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ---------------- libraries ---------------


// ----------------- guards -----------------
import { AuthenticationGuard } from '@guards/authentication.guard';
// ----------------- guards -----------------


// ------------------ views -----------------
import { ProductComponent } from '@app/modules/product/components/_product/product.component';
import { GroupComponent } from '@modules/product/components/group/group.component';
import { GroupListComponent } from './components/group-list/group.list.component';
// ------------------ views -----------------


const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'group/list/:id',
        component: GroupListComponent
      },
      {
        path: 'group/:id',
        component: GroupComponent
      },
      {
        path: 'group/edit/:id',
        component: GroupComponent
      },
      {
        path: 'group/add',
        component: GroupComponent
      },
      {
        path: 'product/list',
        component: GroupComponent
      },
      {
        path: 'product/:id',
        component: GroupComponent
      },
      {
        path: 'product/edit/:id',
        component: GroupComponent
      },
      {
        path: 'product/add',
        component: GroupComponent
      }
    ],
    canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthenticationGuard]
})
export class ProductRoutingModule {

  constructor() { }
}

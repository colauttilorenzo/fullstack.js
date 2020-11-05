// ---------------- libraries ---------------
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ---------------- libraries ---------------


// ----------------- guards -----------------
import { AuthenticationGuard } from '@guards/authentication.guard';
// ----------------- guards -----------------


// ------------------ views -----------------
import { DashboardComponent } from '@modules/home/components/dashboard/dashboard.component';
import { HomeComponent } from '@app/modules/home/components/_home/home.component';
// ------------------ views -----------------


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: '/home/dashboard',
      }
    ],
    canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: '/home/dashboard',
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
export class HomeRoutingModule {

  constructor() { }
}

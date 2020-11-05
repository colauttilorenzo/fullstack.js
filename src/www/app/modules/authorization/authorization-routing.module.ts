// ---------------- libraries ---------------
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ---------------- libraries ---------------


// ------------------ views -----------------
import { AuthorizationComponent } from '@app/modules/authorization/components/_authorization/authorization.component';
import { SigninComponent } from '@modules/authorization/components/signin/signin.component';
import { SignupComponent } from '@modules/authorization/components/signup/signup.component';
import { SignoutComponent } from '@modules/authorization/components/signout/signout.component';
// ------------------ views -----------------


const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signout',
        component: SignoutComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: '',
        redirectTo: '/authorization/signin',
      }
    ],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: '/authorization/signin',
  }
];

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class LoginRoutingModule {

  constructor() { }
}

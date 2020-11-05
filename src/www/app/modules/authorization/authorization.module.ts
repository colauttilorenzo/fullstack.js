// ---------------- libraries ---------------
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// ---------------- libraries ---------------


// ---------------- modules -----------------
import { LoginRoutingModule } from '@modules/authorization/authorization-routing.module';
// ---------------- modules -----------------


// --------------- components ---------------
import { SharedModule } from '@app/app.shared.module';
import { AuthenticationService } from '@services/authentication.service';
import { AuthorizationComponent } from '@app/modules/authorization/components/_authorization/authorization.component';
import { LayoutComponent } from '@modules/authorization/components/_shared/layout/layout.component';
import { SigninComponent } from '@modules/authorization/components/signin/signin.component';
import { SignupComponent } from '@modules/authorization/components/signup/signup.component';
// --------------- components ---------------


@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    AuthorizationComponent,
    LayoutComponent,
    SigninComponent,
    SignupComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class LoginModule { }

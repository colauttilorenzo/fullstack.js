// ---------------- libraries ---------------
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// ---------------- libraries ---------------


// --------------- components ---------------
import { PageHeaderService } from '@services/page-header.service';
import { GreetingService } from '@services/greeting.service';
import { NavigateService } from '@services/navigate.service';
import { ApplicationService } from '@services/application.service';
import { SpinnerComponent } from '@app/components/_shared/spinner/spinner.component';
import { PageHeaderComponent } from '@app/components/_shared/page-header/page.header.component';
import { StorageService } from '@services/storage.service';
import { AuthenticationService } from '@services/authentication.service';
import { SpinnerService } from '@services/spinner.service';
import { OverlayService } from '@services/overlay.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { SidebarService } from '@services/sidebar.service';
// --------------- components ---------------


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    PageHeaderComponent
  ],
  declarations: [
    SpinnerComponent,
    PageHeaderComponent
  ],
  providers: [
    PageHeaderService,
    GreetingService,
    NavigateService,
    SidebarService,
    ApplicationService,
    StorageService,
    AuthenticationService,
    SpinnerService,
    OverlayService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ]
})

export class SharedModule { }
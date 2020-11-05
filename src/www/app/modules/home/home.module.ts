// ---------------- libraries ---------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ---------------- libraries ---------------


// ---------------- modules -----------------
import { HomeRoutingModule } from '@modules/home/home-routing.module';
import { SharedModule } from '@app/app.shared.module';
// ---------------- modules -----------------


// --------------- components ---------------
import { HomeComponent } from '@app/modules/home/components/_home/home.component';
import { LayoutComponent } from '@app/components/_shared/layout/layout.component';
import { SidebarComponent } from '@app/components/_shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from '@app/services/user.service';
import { ProductService } from '@app/services/product.service';
// --------------- components ---------------


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    LayoutComponent,
    SidebarComponent,
    DashboardComponent
  ],
  providers: [
    UserService,
    ProductService
  ]
})
export class HomeModule { }

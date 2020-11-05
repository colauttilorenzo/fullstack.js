// ---------------- libraries ---------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ---------------- libraries ---------------


// ---------------- modules -----------------
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '@app/app.shared.module';
// ---------------- modules -----------------


// --------------- components ---------------
import { LayoutComponent } from '@app/components/_shared/layout/layout.component';
import { SidebarComponent } from '@app/components/_shared/sidebar/sidebar.component';
import { UserService } from '@app/services/user.service';
import { ProductService } from '@app/services/product.service';
import { ProductComponent } from './components/_product/product.component';
import { GroupComponent } from './components/group/group.component';
import { CompanyService } from '@app/services/company.service';
import { ProductGroupService } from '@app/services/product-group.service';
// --------------- components ---------------


@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    ProductComponent,
    LayoutComponent,
    SidebarComponent,
    GroupComponent
  ],
  providers: [
    UserService,
    ProductService,
    CompanyService,
    ProductGroupService
  ]
})
export class ProductModule { }

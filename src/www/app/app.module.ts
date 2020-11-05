// ---------------- libraries ---------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ---------------- libraries ---------------


// ---------------- modules -----------------
import { SharedModule } from '@app/app.shared.module';
import { RoutingModule } from '@app/app-routing.module';
// ---------------- modules -----------------


// --------------- components ---------------
import { AppComponent } from '@app/components/_app/app.component';
// --------------- components ---------------


@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    RoutingModule
  ],
  exports: [],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
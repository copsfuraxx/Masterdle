import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './containers/nav-bar/nav-bar.component';
import { SideBarComponent } from './containers/side-bar/side-bar.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    NotFoundComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      AuthModule,
      ReactiveFormsModule
    ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

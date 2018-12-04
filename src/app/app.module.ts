import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {customModel} from './custom.material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { GestorComponent } from './gestor/gestor.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    GestorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    customModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

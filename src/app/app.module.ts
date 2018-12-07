import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {customModel} from './custom.material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { GestorComponent } from './gestor/gestor.component';
import { ProdutoComponent } from './gestor/produto/produto.component';
import { MaterialComponent } from './gestor/material/material.component';
import { AcabamentoComponent } from './gestor/acabamento/acabamento.component';
import { CategoriaComponent } from './gestor/categoria/categoria.component';
import { EncomendaComponent } from './cliente/encomenda/encomenda.component';
import { ItemComponent } from './cliente/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    GestorComponent,
    ProdutoComponent,
    MaterialComponent,
    AcabamentoComponent,
    CategoriaComponent,
    EncomendaComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    customModel,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

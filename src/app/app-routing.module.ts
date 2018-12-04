import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GestorComponent} from './gestor/gestor.component';
import {ClienteComponent} from './cliente/cliente.component';

const routes: Routes = [
  { path: 'gestor', component: GestorComponent},
  { path: 'cliente', component: ClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

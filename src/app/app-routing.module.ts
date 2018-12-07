import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestorComponent } from './gestor/gestor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './gestor/produto/produto.component';
import { MaterialComponent } from './gestor/material/material.component';
import { AcabamentoComponent } from './gestor/acabamento/acabamento.component';
import { CategoriaComponent } from './gestor/categoria/categoria.component';
import { EncomendaComponent } from './cliente/encomenda/encomenda.component';
import { ItemComponent } from './cliente/item/item.component';

const routes: Routes = [
  { path: 'gestor', component: GestorComponent, children: 
    [
      { path: 'produto', component: ProdutoComponent },
      { path: 'material', component: MaterialComponent },
      { path: 'acabamento', component: AcabamentoComponent },
      { path: 'categoria', component: CategoriaComponent },
    ] 
  },
  { path: 'cliente', component: ClienteComponent, children: 
  [
    { path: 'encomenda', component: EncomendaComponent },
    { path: 'item', component: ItemComponent },
  ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

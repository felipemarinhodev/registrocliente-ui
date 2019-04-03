import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../seguranca/auth.guard';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteViewComponent } from './components/cliente-view/cliente-view.component';
import { ClientePesquisaComponent } from './components/cliente-pesquisa/cliente-pesquisa.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientePesquisaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes/new',
    component: ClienteFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes/:id/edit',
    component: ClienteFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes/:id',
    component: ClienteViewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ClienteRoutingModule { }

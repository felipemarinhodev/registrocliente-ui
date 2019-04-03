import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'lancamentos', pathMatch: 'full' }, // pathMatch serve para validar oq esta a esquerda do path.
  // { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  // { path: 'nao-autorizado', component: NaoAutorizadoComponent },

  // { path: '**', redirectTo: 'pagina-nao-encontrada' } // ** qualquer coisa que não foi encontrada cai nessa opção.
  { path: 'clientes', loadChildren: './pages/clientes/clientes.module#ClientesModule' },
  { path: 'login', loadChildren: './seguranca/seguranca.module#SegurancaModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full'  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

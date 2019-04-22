import { Component, OnInit, ViewChild } from '@angular/core';

import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

import toastr from 'toastr';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css'],
})
export class ClientePesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {

    this.buscarClientes();
  }

  buscarClientes() {
    this.clienteService.buscarTodos(0, 20).subscribe(
      data => {
        this.clientes = data['data']['content'];
      }
    );
  }

  confirmarExclusao(cliente: Cliente) {
    const texto = confirm(`Deseja remover o cliente: ${cliente.nome}`);

    if (texto) {
      this.excluir(cliente);
    }

  }

  excluir(cliente: Cliente) {
    this.clienteService.remover(cliente.id)
      .subscribe(
        () => {
          if (this.grid.first === 0) {
            this.buscarClientes();
          } else {
            this.grid.first = 0;
          }
          toastr.success('Cliente excluído com sucesso!');
        }, err => {
          toastr.error('Ocorreu um erro ao processar a sua solicitação');
          console.log(`Deu erro: ${err}`);
        }
      );
  }

  podeMostrar(perfil: string): boolean {
    return localStorage['perfil'] === perfil;
  }

}

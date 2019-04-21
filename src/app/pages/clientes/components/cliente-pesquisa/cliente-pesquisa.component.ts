import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css'],
  providers: [ConfirmationService]
})
export class ClientePesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
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
        }, err => {
          console.log(`Deu erro: ${err}`);
        }
      );
  }

  podeMostrar(perfil: string): boolean {
    return localStorage['perfil'] === perfil;
  }

}

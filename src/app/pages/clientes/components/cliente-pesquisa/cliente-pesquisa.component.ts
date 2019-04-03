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
        console.log(`Mostrar resultado da busca: ${JSON.stringify(data)}`);
        this.clientes = data['data']['content'];
      }
    );
  }

  confirmarExclusao(cliente: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.excluir(cliente);
      },
      reject: () => {
        // this.toastyService.warning();
      }
    });
  }

  excluir(cliente: any) {
    console.log('Excluir o registro');

    // TODO: Chamar a exclusão
    // this.pessoaService.excluir(pessoa.codigo)
    //   .then(() => {
    //     if (this.grid.first === 0) {
    //       this.pesquisar();
    //     } else {
    //       this.grid.first = 0;
    //     }

    //     this.toasty.success('Pesssoa excluída com sucesso!');
    //   })
    //   .catch(erro => this.errorHandler.handle(erro));
  }

  podeMostrar(perfil: string): boolean {
    return localStorage['perfil'] === perfil;
  }

}

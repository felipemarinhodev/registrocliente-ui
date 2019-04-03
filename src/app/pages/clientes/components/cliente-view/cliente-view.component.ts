import { Cliente } from './../../models/cliente.model';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html',
  styleUrls: ['./cliente-view.component.css']
})
export class ClienteViewComponent implements OnInit {

  cliente: Cliente;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const idCliente = this.route.snapshot.params['id'];
    if (!idCliente) {
      // TODO: voltar para tela anterior
    }

    this.pesquisarCliente(idCliente);
  }

  pesquisarCliente(idCliente: string) {
    this.clienteService.buscarPorId(idCliente).subscribe(
      data => {
        this.cliente = data['data'];
      }
    );
  }

  podeMostrar(perfil: string): boolean {
    return localStorage['perfil'] === perfil;
  }
}

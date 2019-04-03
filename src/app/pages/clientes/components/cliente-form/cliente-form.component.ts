import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Mail } from './../../models/mail.model';
import { Cliente } from './../../models/cliente.model';
import { Telefone } from '../../models/telefone.model';
import { Endereco } from '../../models/endereco.model';
import { CpfValidators } from './../../../../shared/validators/cpf.validator';
import { ClienteService } from '../../services/cliente.service';

interface TipoTelefone {
  name: string;
  code: string;
}

interface ClienteVO {
  nome: string;
  cpf: string;
  telefone: string;
  tipoTelefone: TipoTelefone;
  email: string;
  logradouro: string;
  cep: string;
  cidade: string;
  bairro: string;
  uf: string;
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})

export class ClienteFormComponent implements OnInit {

  form: FormGroup;
  clientevo: ClienteVO;
  tiposTelefone: TipoTelefone[];
  tipoSelecionado: TipoTelefone;

  cliente: Cliente;



  // nome: string;
  // cpf: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  mostrarCampoComplemento = true;
  mascaraParaTelefone: string; // = '(99) 9999-9999';
  habilitaTelefone = true;
  telefone: string;
  email: string;




  constructor(
    private titulo: Title,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private clienteService: ClienteService
    ) {
      this.tiposTelefone = [
        {name: 'Residencial', code: 'RESIDENCIAL'},
        {name: 'Comercial', code: 'COMERCIAL'},
        {name: 'Celular', code: 'CELULAR'},
    ];
    }

  ngOnInit() {
    const idCliente = this.route.snapshot.params['id'];

    if (idCliente) {
      this.carregarCliente(idCliente);
      this.atualizarTituloEdicao();
    }
    this.gerarForm();
  }

  get editando() {
    return Boolean(this.route.snapshot.params['id']);
  }

  atualizarTituloEdicao() {
    // TODO: Quando buscar o cliente colocar para mostrar as informações dele aqui!
    // if (this.cliente.nome) {
    //   this.titulo.setTitle(`Edição de cliente: ${this.cliente.nome}`);
    // } else {
      this.titulo.setTitle('Novo de cliente');
    // }
  }
  carregarCliente(id: string) {
    // TODO: Buscar o cliente pelo id
    this.clienteService.buscarPorId(id)
    .subscribe(cliente => {
      console.log(JSON.stringify(cliente['data']));
      this.cliente = cliente['data'];
        this.form.setValue({
          nome: cliente['data']['nome'],
          cpf: cliente['data']['cpf'],
          telefone: cliente['data']['telefones'][0]['telefone'],
          tipoTelefone: cliente['data']['telefones'][0]['tipoTelefone'],
          logradouro: this.cliente.endereco.logradouro,
          complemento: '',
          bairro: this.cliente.endereco.bairro,
          localidade: this.cliente.endereco.cidade,
          uf: this.cliente.endereco.uf,
          cep: this.cliente.endereco.cep,
          email: this.cliente.mails[0].email

        });
      });
      // .catch( erro => this.erroHandler.handle(erro));
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, CpfValidators]],
      tipoTelefone: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      complemento: ['', ],
      bairro: ['', [Validators.required]],
      localidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  salvar() {
    if (this.editando) {
      this.atualizar();
      return;
    }
    this.adicionar();
  }

  atualizar() {
    console.log(JSON.stringify(this.form.value));
    const cli = this.popularClienteParaEdicao(this.form.value, this.cliente);
    this.clienteService.atualizar(cli).subscribe(
      data => {
        console.log(`Cliente salvo com sucesso!`);
        this.router.navigate(['/clientes']);
      },
      err => {
        const msg = err.error.errors.join(' ');
        console.log(`Erro ao tentar persistir: ${msg}`);

      }
    );
    console.log(`Cliente pronto para persistir; ${JSON.stringify(cli)}`);

    if (this.form.invalid) {
      return;
    }
  }
  popularClienteParaEdicao(data: any, cliente: Cliente): any {
    const telefone = new Telefone(cliente.telefones[0].id, data['telefone'], data['tipoTelefone']['code']);
    const email = new Mail(cliente.mails[0].id, data['email']);
    const endereco = new Endereco(cliente.endereco.id, data['logradouro'], data['cep'], data['bairro'], data['localidade'], data['uf']);
    const clienteParaEdicao = new Cliente(cliente.id, data['nome'], data['cpf'], [telefone], [email], endereco);
    return clienteParaEdicao;
  }

  adicionar() {
    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value));
    const cli = this.popularCliente(this.form.value);
    this.clienteService.adicionar(cli).subscribe(
      data => {
        console.log(`Cliente salvo com sucesso!`);
        this.router.navigate(['/clientes']);
      },
      err => {
        const msg = err.error.errors.join(' ');
        console.log(`Erro ao tentar persistir: ${msg}`);

      }
    );
    console.log(`Cliente pronto para persistir; ${JSON.stringify(cli)}`);
  }

  popularCliente(data: any): Cliente {
    const telefone = new Telefone(null, data['telefone'], data['tipoTelefone']['code']);
    const email = new Mail(null, data['email']);
    const endereco = new Endereco(null, data['logradouro'], data['cep'], data['bairro'], data['localidade'], data['uf']);
    const cliente = new Cliente(null, data['nome'], data['cpf'], [telefone], [email], endereco);
    return cliente;
  }

  consultarCEP() {
    const cep = this.form.value['cep'];
    return this.clienteService.buscarDadosCEP(cep).subscribe(
      data => {
        this.localidade = data['localidade'];
        this.logradouro = data['logradouro'];
        this.uf = data['uf'];
        this.bairro = data['bairro'];
        this.localidade = data['localidade'];
      }
    );
    this.mostrarCampoComplemento = false;
  }

  limparCamposEndereco() {
    this.localidade = '';
    this.logradouro = '';
    this.uf = '';
    this.bairro = '';
    this.complemento = '';

    this.mostrarCampoComplemento = true;
  }

  tipoTelefoneSelecionado() {
    const tipoTelefone = this.form.value['tipoTelefone'];
    if (tipoTelefone) {
      this.habilitaTelefone = false;
      if (tipoTelefone.code === 'CELULAR') {
        this.mascaraParaTelefone = '(99) 99999-9999';
      } else {
        this.mascaraParaTelefone = '(99) 9999-9999';

      }
    }
  }
}

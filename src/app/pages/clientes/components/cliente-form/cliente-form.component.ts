import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import toastr from 'toastr';
import { Mail } from './../../models/mail.model';
import { Cliente } from './../../models/cliente.model';
import { Telefone } from '../../models/telefone.model';
import { Endereco } from '../../models/endereco.model';
import { CpfValidators } from './../../../../shared/validators/cpf.validator';
import { ClienteService } from '../../services/cliente.service';

enum Operacao {
  VISUALIZAR, EDITAR, ADICIONAR
}

interface TipoTelefone {
  name: string;
  code: string;
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})

export class ClienteFormComponent implements OnInit, AfterContentChecked {

  form: FormGroup;
  tiposTelefone: TipoTelefone[];
  tipoSelecionado: TipoTelefone;

  cliente: Cliente;

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
  cabecalho: string;
  telefones: Telefone[];

  acaoCorrente: Operacao;

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
    }
    this.gerarForm();
    this.acaoCorrente = this.getDefineOperation();
  }

  ngAfterContentChecked(): void {
    this.definirTituloDaPagina();
  }

  private getDefineOperation(): Operacao {
    if (this.route.snapshot.url[1].path === 'new') {
      return Operacao.ADICIONAR;
    // tslint:disable-next-line:triple-equals
    } else if (this.route.snapshot.url[2] != undefined && this.route.snapshot.url[2].path === 'edit') {
      return Operacao.EDITAR;
    } else {
      return Operacao.VISUALIZAR;
    }
  }

  get editando() {
    return Boolean(this.route.snapshot.params['id']);
  }

  carregarCliente(id: string) {
    this.clienteService.buscarPorId(id)
    .subscribe(cliente => {
      this.cliente = cliente['data'];
      this.telefones = this.cliente.telefones;
      this.form = this.fb.group({
        nome: cliente['data']['nome'],
        cpf: cliente['data']['cpf'],
        telefone: this.cliente.telefones[0].telefone,
        tipoTelefone: this.cliente.telefones[0].tipoTelefone,
        telefones: this.cliente.telefones,
        logradouro: this.cliente.endereco.logradouro,
        complemento: '',
        bairro: this.cliente.endereco.bairro,
        localidade: this.cliente.endereco.cidade,
        uf: this.cliente.endereco.uf,
        cep: this.cliente.endereco.cep,
        email: this.cliente.mails[0].email

      });
    });
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, CpfValidators]],
      tipoTelefone: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      telefones: [''],
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
    const cli = this.popularClienteParaEdicao(this.form.value, this.cliente);
    this.clienteService.atualizar(cli).subscribe(
      data => {
        toastr.success('Cliente alterado com sucesso!');
        this.router.navigate(['/clientes']);
      },
      err => {
        toastr.error('Ocorreu um erro ao processar a sua solicitação');
        const msg = err.error.errors.join(' ');
      });

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

    const cli = this.popularCliente(this.form.value);
    this.clienteService.adicionar(cli).subscribe(
      data => {
        toastr.success('Cliente cadastrado com sucesso!');
        this.router.navigate(['/clientes']);
      },
      err => {
        toastr.error('Ocorreu um erro ao processar a sua solicitação');
        const msg = err.error.errors.join(' ');
      });
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

  isOperacaoVisualizar(): Boolean {
    return this.acaoCorrente === Operacao.VISUALIZAR;
  }

  private definirTituloDaPagina() {
    switch (this.acaoCorrente) {
      case Operacao.ADICIONAR: {
        this.cabecalho = 'Novo Cliente';
        break;
      }
      case Operacao.EDITAR: {
        this.cabecalho = 'Edição de cliente';
        break;
      }
      default : {
        this.cabecalho = 'Visualizar cliente';
        break;
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm(): any {
    this.form = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  logar() {
    const valueForm = this.form.value;
    const nomeUsuario = valueForm['usuario'];
    const senha = valueForm['senha'];
    const loginInput = new Login(nomeUsuario, senha);
    return this.auth.login(loginInput)
    .subscribe(
      data => {
        this.auth.armazenarToken(data);
        console.log(`Resposta da consulta: ${JSON.stringify(data)}`);
        this.router.navigate(['/clientes']);

      },
      err => {
        console.log('Aconteceu um erro ao realizar a autenticação, tente novamente mais tarde.');
      }
    );

  }

}

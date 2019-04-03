import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs';

import { Login } from '../models/login.model';

import { environment as env} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = env.URL_PATH + 'auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(login: Login): Observable<any> {
    return this.http.post(this.URL, login, {headers: this.getHeader() });
  }

  getHeader(): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set(
      'Content-Type', 'application/json'
    );
    return httpHeaders;
  }

  logout() {
    delete localStorage['token'];
    delete localStorage['perfil'];
    this.router.navigate(['/']);
  }

  temPermissao(permissao: string) {
    return localStorage['perfil'] === permissao;
  }

  temQualquerPermissao() {
    return localStorage['perfil'] !== null;
  }

  armazenarToken(data: any) {
    localStorage['token'] = data['token'];
    const perfil = data['usuario']['profile'];
    localStorage['perfil'] = perfil;
  }

  get logado(): boolean {
    const token = localStorage['token'];
    return token ? true : false;
  }

  temToken(): any {
    return this.logado;
  }
}

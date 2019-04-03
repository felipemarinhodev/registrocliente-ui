import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cliente } from '../models/cliente.model';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  CAMINHO_SERVICO = 'cliente';

  constructor(
    private http: HttpClient
  ) { }


  getHeader(): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set(
      // 'Authorization', localStorage.getItem('token')
      'Authorization', env.TOKEN
    );
    return httpHeaders;
  }

  atualizar(cliente: Cliente) {
    return this.http.put(env.URL_PATH + this.CAMINHO_SERVICO + '/' + cliente.id, cliente, { headers: this.getHeader() });
  }

  adicionar (cliente: Cliente): Observable<any> {
    return this.http.post(env.URL_PATH + this.CAMINHO_SERVICO, cliente, { headers: this.getHeader() });
  }

  buscarTodos(pagina: number, quantidade: number) {
    return this.http.get(env.URL_PATH + this.CAMINHO_SERVICO + `/${pagina}/${quantidade}`, {headers: this.getHeader() });
  }

  buscarPorId(id: string) {
    return this.http.get(env.URL_PATH + this.CAMINHO_SERVICO + `/${id}`, {headers: this.getHeader() });
  }

  remover(id: string) {
    return this.http.delete(env.URL_PATH + this.CAMINHO_SERVICO + `/${id}`);
  }

  buscarDadosCEP(cep: string): Observable<any> {
    const URL = 'https://viacep.com.br/ws/{cep}/json';
    const PATH_VIACEP = URL.replace('{cep}', cep);
    return this.http.get(PATH_VIACEP);
  }

}

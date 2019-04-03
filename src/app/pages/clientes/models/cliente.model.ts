import { Endereco } from './endereco.model';
import { Telefone } from './telefone.model';
import { Mail } from './mail.model';

export class Cliente {
  constructor(
    public id: string,
    public nome: string,
    public cpf: string,
    public telefones: Telefone[],
    public mails: Mail[],
    public endereco: Endereco
  ) {}

}

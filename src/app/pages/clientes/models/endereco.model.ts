export class Endereco {
  constructor(
    public id: string,
    public logradouro: string,
    public cep: string,
    public bairro: string,
    public cidade: string,
    public uf: string
  ) {}

}

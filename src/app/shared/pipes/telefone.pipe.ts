import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(telefone: string): string {
    let numeroFormatado = '(';
    if (telefone.length <= 10) {
      numeroFormatado += telefone.substring(0, 2) + ') ';
      numeroFormatado += telefone.substring(2, 6) + '-';
      numeroFormatado += telefone.substring(6, 11) ;
    } else if (telefone.length > 10) {
      numeroFormatado += telefone.substring(0, 2) + ') ';
      numeroFormatado += telefone.substring(2, 7) + '-';
      numeroFormatado += telefone.substring(7, 12);
    } else {
      numeroFormatado = telefone;
    }
    return numeroFormatado;
  }

}

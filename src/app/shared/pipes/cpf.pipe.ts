import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(data: string): string {
    let cpfFormatado = '';
    cpfFormatado = data.substring(0, 3) + '.';
    cpfFormatado += data.substring(3, 6) + '.';
    cpfFormatado += data.substring(6, 9) + '-';
    cpfFormatado += data.substring(9, 11);
    return cpfFormatado;
  }

}

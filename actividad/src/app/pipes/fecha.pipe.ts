import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fechaProyecto: string): any {
    if (fechaProyecto) {
      const fecha = fechaProyecto.split('-');
      return fecha[2] + '-' + fecha[1] + '-' + fecha[0];
    } else {
      return '00-00-0000';
    }
  }

}

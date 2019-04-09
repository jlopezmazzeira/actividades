import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-actualizar-contrasenia',
  templateUrl: './actualizar-contrasenia.component.html',
  styles: []
})
export class ActualizarContraseniaComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(password: string) {
    //this.usuario.nombre = usuario.nombre;

    /*this._usuarioService.actualizarUsuario(usuario)
    .subscribe();*/
  }

}

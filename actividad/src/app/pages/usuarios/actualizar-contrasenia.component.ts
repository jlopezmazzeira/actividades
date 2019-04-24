import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-actualizar-contrasenia',
  templateUrl: './actualizar-contrasenia.component.html',
  styles: []
})
export class ActualizarContraseniaComponent implements OnInit {

  usuario: Usuario;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const password = f.value.password;
    const passwordConfirm = f.value.confirm_password;

    if (this.validarPassword(password, passwordConfirm)) {
      this._usuarioService.actualizarContrasenia(password)
    .subscribe(() => this.router.navigate(['/dashboard']));
    } else {
      swal('Contraseñas invalidas', 'Las contraseñas deben ser iguales', 'error');
    }
  }

  validarPassword(ps1: string, ps2: string) {
    if (ps1 === ps2) {
      return true;
    } else {
      return false;
    }
  }

}

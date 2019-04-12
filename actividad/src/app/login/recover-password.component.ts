import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
declare var swal: any;

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styles: []
})
export class RecoverPasswordComponent implements OnInit {

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

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

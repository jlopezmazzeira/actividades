import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
declare var swal: any;
declare function init_plugins();

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./login.component.css']
})
export class RecoverComponent implements OnInit {

  id: string;
  token: string;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public _usuarioService: UsuarioService) {
    activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      this.token = params['token'];
    });
  }

  ngOnInit() {
    init_plugins();
    this._usuarioService.verificarTokenEmail(this.id, this.token)
    .subscribe();
  }

  guardar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const password = f.value.password;
    const passwordConfirm = f.value.confirm_password;

    if (this.validarPassword(password, passwordConfirm)) {
      this._usuarioService.recoverContrasenia(this.id, password)
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

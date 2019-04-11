import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '');

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public _serviceUsuario: UsuarioService) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarUsuario(id);
      }
    });
  }

  ngOnInit() {
  }

  cargarUsuario(id: string) {
    this._serviceUsuario.cargarUsuario(id)
    .subscribe( usuario => {
      this.usuario = usuario;
      // this.medico.hospital = medico.hospital._id;
      // this.cambioHospital(this.medico.hospital);
    });
  }

  guardarUsuario(f: NgForm) {
    if (f.invalid) {
      return;
    }

    if (!this.usuario._id) {
      this.usuario.password = '123456';
    }

    this._serviceUsuario.guardarUsuario(this.usuario)
        .subscribe(usuario => {
          this.usuario._id = usuario._id;
          this.router.navigate(['/usuarios']);
        });

  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService, ProyectoService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '');
  mostrarProyectos = false;
  proyectos: Proyecto[] = [];
  proyectosUsuario: Proyecto[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public _serviceUsuario: UsuarioService,
              public _serviceProyecto: ProyectoService) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarUsuario(id);
        this.cargarProyectos();
        this.mostrarProyectos = true;
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

  cargarProyectos() {
    this.cargando = true;

    this._serviceProyecto.cargarProyectos(this.desde).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.proyectos = resp.proyectos;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;

    this.cargarProyectos();
  }

  buscarProyecto(termino: string) {

    if (termino.length <= 0) {
      this.cargarProyectos();
      return;
    }

    this.cargando = true;

    this._serviceProyecto.buscarProyecto(termino)
      .subscribe((proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
        this.cargando = false;
    });
  }

}

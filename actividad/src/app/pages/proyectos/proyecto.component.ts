import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService, ActividadService } from '../../services/services.index';
import { Proyecto } from '../../models/proyecto.model';
import { Actividad } from '../../models/actividad.model';
declare var swal: any;

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styles: []
})
export class ProyectoComponent implements OnInit {

  proyecto: Proyecto = new Proyecto('', '', '');
  mostrarActividades = false;
  actividades: Actividad[] = [];
  actividadesProyecto: Actividad[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public _serviceProyecto: ProyectoService,
              public _serviceActividad: ActividadService) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarProyecto(id);
        this.cargarActividades();
        this.mostrarActividades = true;
      }
    });
  }

  ngOnInit() {
  }

  cargarProyecto(id: string) {
    this._serviceProyecto.cargarProyecto(id)
    .subscribe( proyecto => {
      this.proyecto = proyecto;
      // this.medico.hospital = medico.hospital._id;
      // this.cambioHospital(this.medico.hospital);
    });
  }

  guardarProyecto(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const desde = new Date(this.proyecto.fechaInicio);
    const hasta = new Date(this.proyecto.fechaTermino);
    const resta = desde.getTime() - hasta.getTime();
    const dias = Math.round(resta / (1000 * 60 * 60 * 24));
    this.proyecto.cantidadHoras = dias * 8;

    this._serviceProyecto.guardarProyecto(this.proyecto)
    .subscribe(proyecto => {
      this.proyecto._id = proyecto._id;
      this.router.navigate(['/proyectos']);
    });

  }

  cargarActividades() {
    this.cargando = true;

    this._serviceActividad.cargarActividades(this.desde).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.actividades = resp.actividades;
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

    this.cargarActividades();
  }

  buscarActividad(termino: string) {

    if (termino.length <= 0) {
      this.cargarActividades();
      return;
    }

    this.cargando = true;

    this._serviceActividad.buscarActividad(termino)
      .subscribe((actividades: Actividad[]) => {
        this.actividades = actividades;
        this.cargando = false;
    });
  }

}

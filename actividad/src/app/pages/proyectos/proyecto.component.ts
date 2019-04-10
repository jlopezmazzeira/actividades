import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../services/services.index';
import { Proyecto } from '../../models/proyecto.model';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styles: []
})
export class ProyectoComponent implements OnInit {

  proyecto: Proyecto = new Proyecto('', '', '');

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public _serviceProyecto: ProyectoService) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarProyecto(id);
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

    /*this._medicoService.guardarMedico(this.medico)
    .subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });*/

  }

}

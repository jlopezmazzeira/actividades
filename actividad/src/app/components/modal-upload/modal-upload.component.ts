import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(
            public _subirArchivoService: SubirArchivoService,
            public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(e) {
    const archivo = e.target.files[0];

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagenTemp = fileReader.result;
    };
    fileReader.readAsDataURL(archivo);
    this.imagenSubir = archivo;
    e.target.value = '';

   }

   subirImagen() {
     this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
     .then( resp => {
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
     })
     .catch( err => {
       console.log('Error en la carga..');
     });
   }

}

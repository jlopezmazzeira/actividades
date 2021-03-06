import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalActividadComponent } from '../components/modal-actividad/modal-actividad.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumsComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent,
    ModalActividadComponent
  ],
  exports: [
    HeaderComponent,
    BreadcrumsComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent,
    ModalActividadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule
  ]
})
export class SharedModule { }

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RecoverGuard implements CanActivate {
  constructor(public router: Router,
              public _usuarioService: UsuarioService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route.params);
    return true;
    /* if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }*/
  }
}

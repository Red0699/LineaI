import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { LoginService } from '../_service/login.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  userActivity: any;
  inactivity: Subject<any> = new Subject();
  stopFlag: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private loginService: LoginService,
    private route: Router,
    private snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.loginService.estaLogueado() === true) {

      const helper = new JwtHelperService();
      const token = sessionStorage.getItem(environment.TOKEN);

      if (!helper.isTokenExpired(token)) {

        const decodedToken = helper.decodeToken(token);
        const rol: string = decodedToken.authorities[0];
        const url: string = state.url;

        this.stopFlag = this.inactivity.subscribe((data) => {
          this.loginService.cerrarSesion();
          this.openSnackBar('El tiempo de sesión ha expirado');
          return false;
        });

        if (url.includes('ingresar') && rol === 'Administrador')
          return true;
        else if (url.includes('editar') && rol === 'Administrador')
          return true;
        else if (url.includes('departamento') && rol === 'Administrador')
          return true;
        else if (url.includes('vehiculo') && rol === 'Administrador')
          return true;
        else if (url.includes('usuario') && rol === 'Administrador')
          return true;
        else {
          this.loginService.toolBarReactiva.next(false);
          this.route.navigate(['/nopermiso']);
          return false;
        }

      } else {
        sessionStorage.clear();
        return false;
      }
    } else {
      this.route.navigate(['/nopermiso']);
      return false;
    }
  }


  setTimeout(): void {
    if (this.loginService.estaLogueado()) {
      this.userActivity = setTimeout(() => this.inactivity.next(undefined), 90000);
    }
  }

  openSnackBar(error: string): void {
    this.snackBar.open(error, 'Cerrar', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient) { }

  private refreshUser$ = new Subject<void>();

  get refresh(){
    return this.refreshUser$;
  }


  listarU(page: number, size: number) {
    return this.http.get<any>(`${this.url}/pageablePorRol/4/${page}/${size}`);
  }

  listarUPorId(idUsuario: number) {
    return this.http.get<Usuario>(`${this.url}/listar/${idUsuario}`);
  }

  public guardarUsuario(usuario: Usuario) {
    return this.http.post(`${this.url}/guardar`, usuario).pipe(
      tap(() =>  {
        this.refreshUser$.next();
      })
    );
  }

  public editarUsuario(usuario: Usuario) {
    return this.http.put(`${this.url}/editar`, usuario).pipe(
      tap(() =>  {
        this.refreshUser$.next();
      })
    );
  }

  public eliminarUsuario(idUsuario: number){
    return this.http.delete(`${this.url}/eliminar/${idUsuario}`).pipe(
      tap(() =>  {
        this.refreshUser$.next();
      })
    );
  }

  asociados(idVehiculo: number){
    return this.http.get<Usuario[]>(`${this.url}/listarConductorNoVehiculo/${idVehiculo}`);
  }

  noAsociados(idVehiculo: number){
    return this.http.get<Usuario[]>(`${this.url}/listarConductorVehiculo/${idVehiculo}`);
  }

}

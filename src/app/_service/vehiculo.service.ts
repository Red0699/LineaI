import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../_model/Vehiculo';
import { tap } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url: string = `${environment.HOST}/vehiculos`;
  
  constructor(private http: HttpClient) { }

  private refreshVehiculo$ = new Subject<void>();

  get refresh(){
    return this.refreshVehiculo$;
  }

  public guardar(vehiculo: Vehiculo){
      return this.http.post(`${this.url}/guardar`, vehiculo).pipe(
        tap(() =>  {
          this.refreshVehiculo$.next();
        })
      );
  }

  public editar(vehiculo: Vehiculo){
      return this.http.put(`${this.url}/editar`, vehiculo).pipe(
        tap(() =>  {
          this.refreshVehiculo$.next();
        })
      );
  }

  public listarV(page: number, size:number){
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  listarIdVeh(id: number){
    return this.http.get<Vehiculo>(`${this.url}/listar/${id}`);
  }


}

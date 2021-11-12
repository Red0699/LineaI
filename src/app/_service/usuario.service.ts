import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface UserInfo{
  content: Usuario[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: number;
    unpaged: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient) { }

  
  public listarU(page: number, size:number): Observable<UserInfo>{
    const rol = 4;
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`).pipe(
      map((uInfo: UserInfo) => uInfo),
      catchError(err => throwError(err))
    );
  }
  
}

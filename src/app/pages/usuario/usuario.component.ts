import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService, UserInfo } from 'src/app/_service/usuario.service';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  
  pageIndex: number = 0;
  pageSize: number = 5;
  lengthPage: number;

  displayedColumns: String[] = ['documento', 'nombre', 'apellido', 'nick', 'direccion','celular','correo','departamento','ciudad','rol']
  dataSource = new MatTableDataSource<Usuario>([]);
  info : UserInfo;

  constructor(public route: ActivatedRoute, 
    private usuarioService: UsuarioService,
    private barraProgresoService: BarraDeProgresoService) { }

  ngOnInit(): void {
    this.cargarUsuarioInfo();
  }

  private cargarUsuarioInfo(): void{
    this.usuarioService.listarU(0, 3).pipe(
      tap(data => console.log(data)),
      map((uInfo: UserInfo) => this.info = uInfo)
    ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      // this.loader.progressBarReactiva.next(true);
    });
  }

  listarUsuario(){
    this.usuarioService.listarU(this.pageIndex, this.pageSize).pipe(
      map((uInfo: UserInfo) => this.info = uInfo)
    ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  eCambiarPagina(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarUsuario();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

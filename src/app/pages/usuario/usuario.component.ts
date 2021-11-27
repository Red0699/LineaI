import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
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

  displayedColumns: String[] = ['documento', 'nombre', 'apellido', 'nick', 'direccion','celular','correo','departamento','ciudad','rol','accion']
  dataSource = new MatTableDataSource<Usuario>([]);

  constructor(public route: ActivatedRoute, 
    private usuarioService: UsuarioService,
    private barraProgresoService: BarraDeProgresoService) { }

  ngOnInit(): void {
    this.listarUsuario();
  }


  listarUsuario(){
    this.barraProgresoService.progressBarReactiva.next(false);
    this.usuarioService.listarU(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.lengthPage = data.totalElements;
      this.barraProgresoService.progressBarReactiva.next(true);
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

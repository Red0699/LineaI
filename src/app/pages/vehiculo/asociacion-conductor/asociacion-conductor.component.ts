import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/_model/usuario';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatPaginator } from '@angular/material/paginator';
import { Asociacion } from 'src/app/_model/Asociacion';

@Component({
  selector: 'app-asociacion-conductor',
  templateUrl: './asociacion-conductor.component.html',
  styleUrls: ['./asociacion-conductor.component.css']
})
export class AsociacionConductorComponent implements OnInit {


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSourceUsuarioSel: any[];
  idVehiculo: number;
  idUsuario: number;
  selectedValue: any;
  vehiculo: Vehiculo;

  id: number;
  displayedColumns: any[] = ['nombre', 'apellido', 'acciones'];
  dataSourceConductores = new MatTableDataSource<Usuario>();

  constructor(
    private usuarioService: UsuarioService,
    private vehiculoService: VehiculoService,
    public dialogRef: MatDialogRef<AsociacionConductorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehiculo
  ) { }

  ngOnInit(): void {
    this.idVehiculo = this.data.idVehiculo;
    this.cargarDatosTabla();
    this.listarNoAsociados();
  }

  cargarDatosTabla(){
    this.usuarioService.asociados(this.idVehiculo).subscribe(res => {
      console.log('data'+ res);
      this.dataSourceConductores = new MatTableDataSource(res);
      this.dataSourceConductores.paginator = this.paginator;
      this.dataSourceConductores.sort = this.sort;
    });
  }

  listarNoAsociados(){
    this.usuarioService.noAsociados(this.idVehiculo).subscribe(data => {
      this.dataSourceUsuarioSel = data;
    });
  }

  Asociar(){
    let asociacion = new Asociacion();
    asociacion.idUsuario = this.idUsuario;
    asociacion.idVehiculo = this.data.idVehiculo;
    this.vehiculoService.asociarVehiculos(asociacion).subscribe(() => {
      
      this.cargarDatosTabla();
      this.listarNoAsociados();
    });
  }

  desasociar(idUser: number){
    let desasociar = new Asociacion();
    desasociar.idUsuario = idUser;
    desasociar.idVehiculo = this.data.idVehiculo;
    this.vehiculoService.desasociarVehiculo(desasociar).subscribe(() => {
      this.cargarDatosTabla();
      this.listarNoAsociados();
    });
  }

  idUserSelect(event){
    this.selectedValue = event.idUsuario;
  }

  cerrarDialogo(){
    this.dialogRef.close({event: 'Cancelo'});
  }

}

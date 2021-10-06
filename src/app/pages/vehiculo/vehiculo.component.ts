import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  @ViewChild("VehiculoPaginator") paginator: MatPaginator;

  displayedColumns: String[] = ['idVehiculo','placa','modelo','marca','tipoVehiculo','capacidad']
  dataSource = new MatTableDataSource<Vehiculo>();
  constructor(private vehiculoService: VehiculoService,
              public route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  

  ngOnInit(): void {

    /*let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.idVehiculo = 5;
    vehiculo.placa = "akm-147";
    vehiculo.modelo = "2019";
    vehiculo.marca = "Ford";
    vehiculo.tipoVehiuclo = "Carga";
    vehiculo.capacidad = "50Kg"; */
    
    this.vehiculoService.listarV().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })

    /*this.vehiculoService.guardar(vehiculo).subscribe(data =>{
        console.log("Se registro vehiculo");
    });*/
/*
     this.vehiculoService.editar(vehiculo).subscribe(data =>{
        console.log("Vehiculo editado correctamente");
      }, err => {
        if(err.error.status == 500) {
          this.openSnackBar("Error inesperado, comuniquese con el administrador");
        } else{
          this.openSnackBar(err.error.message);
        }
        
      });
*/

  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

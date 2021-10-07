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

  page: number = 0;
  size: number = 5;



  displayedColumns: String[] = ['placa', 'modelo', 'marca', 'tipoVehiculo', 'capacidad']
  dataSource = new MatTableDataSource<Vehiculo>();
  constructor(private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute) { }



  ngOnInit(): void {

    this.listarVeh();

    /*let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.idVehiculo = 5;
    vehiculo.placa = "akm-147";
    vehiculo.modelo = "2019";
    vehiculo.marca = "Ford";
    vehiculo.tipoVehiuclo = "Carga";
    vehiculo.capacidad = "50Kg"; */



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

  listarVeh() {
    this.vehiculoService.listarV(this.page, this.size).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
    });
  }

  cambiarPag(e: any) {
    this.page = e.page
    this.size = e.size;
    this.listarVeh();
  }



  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    let vehiculo: Vehiculo = new Vehiculo();
    vehiculo.idVehiculo = 5;
    vehiculo.placa = "akm-147";
    vehiculo.modelo = "2019";
    vehiculo.marca = "Ford";
    vehiculo.tipoVehiuclo = "Carga";
    vehiculo.capacidad = "50Kg"; 

    /*this.vehiculoService.guardar(vehiculo).subscribe(data =>{
        console.log("Se registro vehiculo");
    });*/

     this.vehiculoService.editar(vehiculo).subscribe(data =>{
        console.log("Vehiculo editado correctamente");
      }, err => {
        if(err.error.status == 500) {
          this.openSnackBar("Error inesperado, comuniquese con el administrador");
        } else{
          this.openSnackBar(err.error.message);
        }
        
      });


  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VehiculoService } from './../../../_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  private idVehiculo: number;
  private edicion : boolean;

  selectedItem : string;
  selectedItemTV : string;
  positions = [
    {value: 'Toyota' },
    {value: 'Chevrolet'},
    {value: 'Renault'},
    {value: 'Mazda'},
    {value: 'Mercedes'},
    {value: 'Alfa Romeo'},
    {value: 'Audi'},
    {value: 'Ferrari'},
    {value: 'Peugeot'},
    {value: 'Porche'}
  ];

  tipoVeh = [
    {tipo: 'Carro'},
    {tipo: 'Camioneta'},
    {tipo: 'Furgon'},
    {tipo: 'Campero'}
  ]

  Vehform = this.fb.group({
    placa: ['', Validators.required],
    modelo: [null, Validators.required],
    marca: ['', Validators.required],
    tipoVehiuclo: ['', Validators.required],
    capacidad: ['', Validators.required]
  });
  constructor(private serviceAgregarVehiculo: VehiculoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idVehiculo = params['idVehiculo'];
      // si llega el id edicion es verdadera
      this.edicion = params['idVehiculo'] != null;
    });

    // Se comprueba el estado de edicion
    this.formularioVacio();
    if (this.edicion === true) {
      this.cargar(); //Se carga la data
    }
  }

  formularioVacio(){
    this.Vehform = new FormGroup({
      'placa': new FormControl('', [Validators.required]),
      'modelo': new FormControl(null, [
        Validators.required,
        Validators.min(1900),
        Validators.max(2022)
      ]),
      'marca': new FormControl('', [Validators.required]),
      'tipoVehiuclo': new FormControl('', [Validators.required]),
      'capacidad': new FormControl('', [Validators.required]),
    });
  }

  cargar(){
    this.serviceAgregarVehiculo.listarIdVeh(this.idVehiculo).subscribe(data => {
      this.Vehform.get('placa').setValue(data.placa);
      this.Vehform.get('modelo').setValue(data.modelo);
      this.Vehform.get('marca').setValue(data.marca);
      this.Vehform.get('tipoVehiuclo').setValue(data.tipoVehiuclo);
      this.Vehform.get('capacidad').setValue(data.capacidad);
    });
  }

  guardar() {
    let vehiculo = new Vehiculo();
    vehiculo.placa = this.Vehform.value['placa'];
    vehiculo.modelo = this.Vehform.value['modelo'] + '';
    vehiculo.marca = this.Vehform.value['marca'];
    vehiculo.tipoVehiuclo = this.Vehform.value['tipoVehiuclo'];
    vehiculo.capacidad = this.Vehform.value['capacidad'];

    if (this.edicion === true) {
      //metodo para editar
      vehiculo.idVehiculo = this.idVehiculo;
      this.serviceAgregarVehiculo.editar(vehiculo).subscribe(() => {
        this.Vehform.reset();
        this.router.navigate(['/vehiculo']);
      });
    } else {
      // metodo de guardar
      this.serviceAgregarVehiculo.guardar(vehiculo).subscribe(() => {
        this.Vehform.reset();
        this.router.navigate(['/vehiculo']);
      });
    }
  }

  openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'info', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  get modelo() {
    return this.Vehform.get('modelo');
  }

  get placa() {
    return this.Vehform.get('placa');
  }

  get capacidad() {
    return this.Vehform.get('capacidad');
  }

  get tipoVehiuclo(){
    return this.Vehform.get('tipoVehiuclo');
  }

  get marca(){
    return this.Vehform.get('marca');
  }


}

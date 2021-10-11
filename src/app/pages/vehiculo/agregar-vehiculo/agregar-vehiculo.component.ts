import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from './../../../_service/vehiculo.service';
import { Vehiculo } from 'src/app/_model/Vehiculo';

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
    {value: 'Ford' },
    {value: 'Chevrolet'},
    {value: 'Toyota'},
    {value: 'Mazda'},
    {value: 'Renault'},
    {value: 'Audi'},
    {value: 'BMW'},
    {value: 'Honda'},
    {value: 'Jeep'},
    {value: 'Nissan'},
    {value: 'Suzuki'}
  ];

  tipoVeh = [
    {tipo: 'Deportivo'},
    {tipo: 'Camioneta'},
    {tipo: 'Automovil'},
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
    private router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.Vehform = new FormGroup({
      'placa': new FormControl('', [Validators.required]),
      'modelo': new FormControl(null, [Validators.required]),
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

    // metodo de guardar
    this.serviceAgregarVehiculo.guardar(vehiculo).subscribe(() => {
      this.Vehform.reset();
      this.router.navigate(['/vehiculo']);
    });
  }

  get modelo() {
    return this.Vehform.get('modelo');
  }
}

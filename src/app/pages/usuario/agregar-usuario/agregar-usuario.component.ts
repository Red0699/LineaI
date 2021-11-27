import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { Departamento } from 'src/app/_model/Departamento';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Usuario } from 'src/app/_model/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  hide = true;
  private idUser: number;
  private edicion : boolean;
  selectedValue :any;
  idDepartamento : number;
  userForm : FormGroup;

  dataSourceDepartamento: Departamento[];
  dataSourceCiudad: Ciudad[];

  constructor(
    private usuarioService : UsuarioService,
    private departamentoService : DepartamentoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private barraProgresoService : BarraDeProgresoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idUser = params['id'];
      this.edicion = params['id'] != null;
    });

    this.formulario();

    if (this.edicion === true) {
      this.cargarUsuarios();
    }
    this.departamentoService.listar().subscribe(res => {
      this.dataSourceDepartamento = res;
    });
  }

  formulario(){
    this.userForm = new FormGroup({
      'documento': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]{2,25}/)]),
      'apellido': new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]{2,25}/)]),
      'nick': new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9]/)]),
      'clave': new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9]/)]),
      'direccion': new FormControl('', [Validators.required]),
      'celular': new FormControl('', [Validators.required, Validators.pattern(/[0-9]{7,10}/)]),
      'correo': new FormControl('',[Validators.required, , Validators.pattern(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm)] ),
      'ciudad': new FormControl('', [Validators.required])
    });
  }

  idDepar(event) {
    this.selectedValue = event.idDepartamento;
    this.departamentoService.listarCiudadPorDepartamento(this.idDepartamento).subscribe(data => {
      this.dataSourceCiudad = data;
    });
  }

  cargarUsuarios(){
    this.usuarioService.listarUPorId(this.idUser).subscribe(data => {
      this.userForm.get('documento').setValue(data.documento);
      this.userForm.get('nombre').setValue(data.nombre);
      this.userForm.get('apellido').setValue(data.apellido);
      this.userForm.get('nick').setValue(data.nick);
      this.userForm.get('clave').setValue(data.clave);
      this.userForm.get('direccion').setValue(data.direccion);
      this.userForm.get('celular').setValue(data.celular);
      this.userForm.get('correo').setValue(data.correo);
      this.userForm.get('ciudad').setValue(data.ciudad);
    });
  }

  guardarUsuario(){
    let usuario = new Usuario();
    usuario.documento = this.userForm.value['documento'];
    usuario.nombre = this.userForm.value['nombre'];
    usuario.apellido = this.userForm.value['apellido'];
    usuario.nick = this.userForm.value['nick'];
    usuario.clave = this.userForm.value['clave'];
    usuario.direccion = this.userForm.value['direccion'];
    usuario.celular = this.userForm.value['celular'];
    usuario.correo = this.userForm.value['correo'];
    usuario.tipoDocumento = {
      idTipoDocumento: 1
    };
    usuario.rol = {
      idRol: 4
    };

    usuario.ciudad = this.userForm.value['ciudad']

    if (this.edicion === true) {
      usuario.idUsuario = this.idUser;
      this.usuarioService.editarUsuario(usuario).subscribe(() => {
        this.openSnackBarr('Editado correctamente');
        this.userForm.reset();
        this.router.navigate(['/usuario']);
      });
    } else {
      this.usuarioService.guardarUsuario(usuario).subscribe(() => {
        this.userForm.reset();
        this.openSnackBarr('Se ha registrado correctamente');
        this.router.navigate(['/usuario']);
      });
    }
  }

  get documento() {
    return this.userForm.get('documento');
  }

  get nombre() {
    return this.userForm.get('nombre');
  }
  get apellido() {
    return this.userForm.get('apellido');
  }
  
  get nick() {
    return this.userForm.get('nick');
  }
  get clave() {
    return this.userForm.get('clave');
  }
  get direccion() {
    return this.userForm.get('direccion');
  }
  get celular() {
    return this.userForm.get('celular');
  }
  get correo() {
    return this.userForm.get('correo');
  }
  get ciudad() {
    return this.userForm.get('ciudad');
  }
  get departamento() {
    return this.userForm.get('departamento');
  }

  openSnackBarr(mensaje: string) {
    this.snackBar.open(mensaje, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snak-correct']
    });
  }
}

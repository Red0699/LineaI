import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-dialogo-eliminar',
  templateUrl: './dialogo-eliminar.component.html',
  styleUrls: ['./dialogo-eliminar.component.css']
})
export class DialogoEliminarComponent implements OnInit {

  id: number;

  constructor(
    public usuarioService : UsuarioService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogoEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) { }

  ngOnInit(): void {
    this.id = this.data.idUsuario;
  }

  cerrarDialogo(){
    this.dialogRef.close({event: 'Cancelo'});
  }

  eliminarUsuario(id) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.openSnackBar('Eliminado correctamente');
      this.cerrarDialogo();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

}

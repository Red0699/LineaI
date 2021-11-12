export class Usuario{
    documento: string;
    nombre: string;
    apellido: string;
    nick: string;
    clave: string;
    direccion: string;
    celular: string;
    correo: string;
    tipoDocumento: {
        idTipoDocumento: number;
    };
    rol: {
        idRol: number;
    };
    ciudad: {
        idCiudad: number;
        nombre: string;
        departamento: {
            idDepartamento: number;
            nombre: string;
        }
    };
} 
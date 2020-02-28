export class CIVUser{
    constructor(
        public solvente: boolean,
        public sesion: boolean,
        public _id: string,
        public nombre: string,
        public CIV: number,
        public apellido: string,
        public cedula: number,
        public isAdmin: boolean,
        public __v: number
    ) {
        this.solvente = solvente;
        this.sesion = sesion;
        this._id = _id;
        this.nombre = nombre;
        this.CIV = CIV;
        this.apellido = apellido;
        this.cedula = cedula;
        this.isAdmin = isAdmin;
        this.__v = __v;
    }
}
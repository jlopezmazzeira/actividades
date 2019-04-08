export class Usuario {
    constructor(
        public nombre: string,
        public correo: string,
        public password: string,
        public username?: string,
        public img?: string,
        public role?: string,
        public _id?: string,
        public proyectos?: Array<any>
    ) {}
}

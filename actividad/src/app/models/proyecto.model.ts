export class Proyecto {
    constructor(
        public codigo: string,
        public nombre: string,
        public _id?: string,
        public fechaInicio?: string,
        public fechaTermino?: string,
        public cantidadHoras?: number,
        public actividades?: Array<any>
    ) {}
}

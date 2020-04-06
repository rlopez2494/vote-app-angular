import { JuntaDirectiva, TribunalDisciplinario } from "./plate.model";

export class Vote {
    constructor(
        public juntaDirectiva: JuntaDirectiva,
        public juntaDirectivaDeCentro: JuntaDirectiva,
        public tribunalDisciplinario: TribunalDisciplinario,
        public fechaRegistro: Date,
        public usuario: Object
    ) {

        this.juntaDirectiva = juntaDirectiva;
        this.juntaDirectivaDeCentro = juntaDirectivaDeCentro;
        this.tribunalDisciplinario = tribunalDisciplinario;
        this.fechaRegistro = fechaRegistro;
        this.usuario = usuario; 
        
    }
}
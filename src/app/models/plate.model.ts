export class JuntaDirectiva {
    constructor(
        public presidente: string,
        public vicepresidente: string,
        public tesorero: string,
        public secretarioGeneral: string
    ) {
        this.presidente = presidente;
        this.vicepresidente = vicepresidente;
        this.tesorero = tesorero;
        this.secretarioGeneral = secretarioGeneral;
    }
}

export class TribunalDisciplinario {
    constructor(
        public presidente: string,
        public vicepresidente: string,
        public secretarioGeneral: string
    ) {
        this.presidente = presidente;
        this.vicepresidente = vicepresidente;
        this.secretarioGeneral = secretarioGeneral;
    }
}

export class Plate {
    constructor(
        public juntaDirectiva: JuntaDirectiva,
        public juntaDirectivaDeCentro: JuntaDirectiva,
        public tribunalDisciplinario: TribunalDisciplinario
    ) {
        this.juntaDirectiva = juntaDirectiva;
        this.tribunalDisciplinario = tribunalDisciplinario;
        this.juntaDirectivaDeCentro = juntaDirectivaDeCentro;
    }
}
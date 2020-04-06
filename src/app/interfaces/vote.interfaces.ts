import { TribunalDisciplinario, JuntaDirectiva } from '../models/plate.model';

export interface Organo{
    name: string,
    planchas: TribunalDisciplinario | JuntaDirectiva []
}
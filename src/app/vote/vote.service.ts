import { Injectable } from '@angular/core';
import { Vote } from '../models/vote.model';
import { JuntaDirectiva, TribunalDisciplinario } from '../models/plate.model';

@Injectable()

export class VoteService {
    constructor() { }

    vote: Vote =  {
        juntaDirectiva: {
            presidente: '',
            vicepresidente: '',
            tesorero: '',
            secretarioGeneral: ''
        },
        tribunalDisciplinario: {
            presidente: '',
            vicepresidente: '',
            secretarioGeneral: ''
        },
        juntaDirectivaDeCentro: {
            presidente: '',
            vicepresidente: '',
            tesorero: '',
            secretarioGeneral: ''
        },
        fechaRegistro: new Date(),
        usuario: { }
    };

    onChange(nombreOrgano: any, index: any, puesto: any, id: any) {
        this.vote[nombreOrgano][puesto] = id;
    }

    onPlateSelected(plancha?: TribunalDisciplinario | JuntaDirectiva, nombreOrgano?: string ) {
        console.log(plancha)
        if(plancha && nombreOrgano) {
            Object.keys(plancha).forEach((seat) => {
                if(seat !== '_id') {
                    this.vote[nombreOrgano][seat] = plancha[seat].user._id;
                }
                
            })
        }
        
    }

}
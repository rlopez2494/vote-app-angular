import { Plate } from "../../models/plate.model";
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class PlateService{
    constructor(private http: HttpClient) {}
    
    plate: Plate = {
        juntaDirectiva: {
            presidente: "",
            vicepresidente: "",
            tesorero: "",
            secretarioGeneral: "",
        },
      
        tribunalDisciplinario: {
            presidente: "",
            vicepresidente: "",
            secretarioGeneral: ""
        },
      
        juntaDirectivaDeCentro: {
            presidente: "",
            vicepresidente: "",
            tesorero: "",
            secretarioGeneral: ""
        },
    };
    
    onEditPlate(bodyName, seatName, value) {
        this.plate[bodyName][seatName] = value;
    }
    
}
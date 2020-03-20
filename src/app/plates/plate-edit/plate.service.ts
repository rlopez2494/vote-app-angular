import { Plate } from "../../models/plate.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()

export class PlateService{
    constructor(
        private http: HttpClient, 
        private router: Router,
        private route: ActivatedRoute) {}
    
    showDetails: boolean = false;
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
    
    onEditPlate(bodyName, seatName, value, user) {
        this.plate[bodyName][seatName] = value;
        this.plateNames[bodyName][seatName] = `${user.nombre} (${user.CIV})`;
    }

    validateRequest() {

        const users = [];
        let allValid = true;

        Object.keys(this.plate).forEach((body) => {
            Object.keys(this.plate[body]).forEach((seat) => {
                if (this.plate[body][seat].length > 0) {
                    users.push(this.plate[body][seat]);
                } else {
                    allValid = false;
                }
            })
        })

        if (allValid) {
            const urlString = `http://localhost:9000/users/list`;

            this.http.post(urlString, {users})
                .subscribe((responseData: any) => {
                    allValid = (responseData.length === 11);
                }, (err) => {
                    console.log(err);
                })
        } 

        return allValid;

    }

    onRequestSubmitted() {
        const urlString = `http://localhost:9000/plates`
        const body = {
            ...this.plate,
            numero: 4
        }

        this.http.post(urlString, body)
            .subscribe(() => {
                this.router.navigate(['..'], {relativeTo: this.route});
            }, (err) => {
                console.log(err);
            })
    }

    // Object to showcase the data on the inputs
    plateNames: Plate = {
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
        }
    }
    
}
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Plate } from '../models/plate.model';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})

export class PlateService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {}

    userValidation: Observable<{[s: string]: boolean} | null>;

    submissionModal: Plate = {
        directiveBoard: {
            president: '',
            vicepresident: '',
            treasurer: '',
            generalSecretary: '',
        },
        districtDirectiveBoard: {
            president: '',
            vicepresident: '',
            treasurer: '',
            generalSecretary: ''
        },
        disciplinaryCourt: {
            president: '',
            vicepresident: '',
            generalSecretary: ''
        }
    };
    
    oldPlate: Plate;
    valueNameSubscription: Subscription;

    getUser(value: number) {
        return this.http.get(`http://localhost:9000/users/${value}`);
    }

    getCandidate(id: string) { 
        return this.http.get(`http://localhost:9000/candidates/${id}`); 
    }

    async validateUser(control: FormControl) : Promise<{[s: string]: boolean} | null> {

        if (control['_parent'] && (control.value) ) {

            const valueNames: any = await this.getValueNames(control);
            console.log(valueNames)

            this.userValidation = new Observable((observer) => {
                const { value } = control;
                this.getUser(value)
                    .subscribe((userData: any) => {

                        const { _id } = userData;
                        this.getCandidate(_id)
                            .subscribe((candidateData: any) => {
                                console.log(candidateData);
                                observer.next({'registeredAsCandidate': true});
                                observer.complete();
                            }, (error) => {
                                if (error.status === 404) {
                                    const { body, seat } = valueNames;
                                    this.submissionModal[body][seat] = { ...userData } 
                                    console.log(this.submissionModal);
                                    console.log(error.status)
                                    observer.next(null);
                                    observer.complete();
                                }
                            })

                    }, (error) => {
                        const { status } = error;
                        if(status === 404) {
                            observer.next({'userNotRegistered': true});
                            observer.complete();
                        } else if(status === 400) {
                            observer.next({'badInputError': true});
                            observer.complete();
                        }
                           
                    })
            })
            
            return this.userValidation.toPromise();      

        }
        
    }

    async getValueNames(control: FormControl) {
        if(this.valueNameSubscription !== undefined) {
            this.valueNameSubscription.unsubscribe()
        }
        let bodyAndSeatNames = {};
        this.valueNameSubscription = await control['_parent']['_parent'].valueChanges.subscribe(data => {
            if(this.oldPlate === undefined) {
                this.oldPlate = { ...data };
                Object.keys(this.oldPlate)
                    .forEach(body => {
                        Object.keys(this.oldPlate[body])
                            .forEach(seat => {
                                if (this.oldPlate[body][seat] !== null) {
                                    bodyAndSeatNames = { body, seat };
                                }
                            })
                    })

            } else {
                const newPlate = { ...data };
                Object.keys(newPlate)
                    .forEach(body => {
                        Object.keys(newPlate[body])
                            .forEach(seat => {
                                if(newPlate[body][seat] != this.oldPlate[body][seat]) {
                                    bodyAndSeatNames = { body, seat };
                                }
                            })
                    })
                this.oldPlate = { ...newPlate };
            }
              
        })
        
        return bodyAndSeatNames;

    }

    deletePlate(id: string): Observable<any> {
        return this.http.delete(`http://localhost:9000/plates/${id}`);
    }

    getPlates(): Observable<any>{
        return this.http.get(`http://localhost:9000/plates`);
    }

}
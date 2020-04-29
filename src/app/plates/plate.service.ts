// Angular Imports
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

// Models
import { Plate } from '../models/plate.model';

// Environment variables
import { environment } from '../../environments/environment'

@Injectable()

export class PlateService {

    constructor(
        private http: HttpClient,
        private router: Router
        ) {}

    userValidation: Observable<{[s: string]: boolean} | null>;

    submissionModal: Plate = {
        directiveBoard: {
            president: '',
            vicepresident: '',
            treasurer: '',
            generalSecretary: ''
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
        return this.http.get(`${environment.API_URL}/civ-users/${value}`);
    }

    getCandidate(id: string) { 
        return this.http.get(`${environment.API_URL}/candidates/${id}`); 
    }

    async validateUser(control: FormControl) : Promise<{[s: string]: boolean} | null> {

        if (control['_parent'] && (control.value) ) {

            const valueNames: any = await this.getValueNames(control);

            this.userValidation = new Observable((observer) => {
                const { value } = control;
                this.getUser(value)
                    .subscribe((userData: any) => {

                        if (userData.candidate.length > 0) {
                            observer.next({'registeredAsCandidate': true});
                            observer.complete();
                        } else {
                            const { body, seat } = valueNames;
                            this.submissionModal[body][seat] = { ...userData } 
                            observer.next(null);
                            observer.complete();
                        }

                    }, (error) => {
                        const { status } = error;
                        switch (status) {
                            case 404:
                                observer.next({'userNotRegistered': true});
                                observer.complete();
                                break;
                            
                            case 400:
                                observer.next({'badInputError': true});
                                observer.complete();
                                break;
                            
                            case 401:
                                alert('Your session has finished, please login again');
                                localStorage.removeItem('userData');
                                this.router.navigate(['']);
                            default:
                                break;
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
        return this.http.delete(`${environment.API_URL}/plates/${id}`);
    }

    getPlates(): Observable<any>{
        return this.http.get(`${environment.API_URL}/plates`)
            .pipe(catchError(this.handleError));
    }

    // Central function to manage the request errors
    private handleError(errorRes: HttpErrorResponse) {
        
        let errorMessage = 'An unknown error occurred!';
        
        if(!errorRes.error || !errorRes.error.message) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.message) {

            case 'NOT_AUTHORIZED':
                localStorage.removeItem('userData');
                errorMessage = 'You are not authorized to be here';
                break;
        }

        return throwError(errorMessage);
    }

}
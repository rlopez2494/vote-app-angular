// Angular / rxjs imports
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

// Models
import { User } from './user.model';

// Environment variables
import { environment } from '../environments/environment';

export interface AuthResponseData {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    token: string;
}

@Injectable()

export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    autoLogin() {
        const userData: {
            _id: string;
            name: string;
            lastName: string;
            email: string;
            _token: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }
        const loadedUser = new User(
            userData._id, 
            userData.name, 
            userData.lastName, 
            userData.email,
            userData._token
        )
        
        this.user.next(loadedUser);
    }

    logout() {
        
        return this.http.get(`${environment.API_URL}/users/logout`)
            .pipe(
                tap(() => {
                    this.user.next(null);
                    alert('Logged out successfully');
                    this.router.navigate(['']);
                    localStorage.removeItem('userData');
                }),
                catchError(this.handleError)
            );
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        const urlString = `${environment.API_URL}/users/login`;
        const body = { email, password };

        return this.http.post<AuthResponseData>(urlString, body)
            .pipe(
                catchError(this.handleError),
                tap(responseData => {
                    this.handleAuthentication(responseData as User);
                })
            ); 
    }

    signup(submissionForm: any): Observable<AuthResponseData> {
        const urlString = `${environment.API_URL}/users`;
        const requestBody = { ...submissionForm };

        return this.http.post<AuthResponseData>(urlString, requestBody)
            .pipe(
                catchError(this.handleError),
                tap(responseData => {
                    this.handleAuthentication(responseData as User);
                })
            );
    } 

    // Central function to generate an authenticated user
    private handleAuthentication({ _id, name, lastName, email, token }: User) {
        const user = new User(
            _id, 
            name, 
            lastName, 
            email, 
            token
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    // Central function to manage the request errors
    private handleError(errorRes: HttpErrorResponse) {
        
        let errorMessage = 'An unknown error occurred!';

        if(!errorRes.error || !errorRes.error.message) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            
            case 'INVALID_CREDENTIALS':
                errorMessage = 'Invalid user/password';
                break;

            case 'NOT_AUTHORIZED':
                localStorage.removeItem('userData');
                errorMessage = 'You are not authorized';
                break;

        }

        return throwError(errorMessage);
    }
}
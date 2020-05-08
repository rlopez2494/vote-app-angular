// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Models
import { Vote } from '../models/vote.model';

// Environment variables
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()

export class VoteService {
    constructor(private http: HttpClient) { }

    submitVote(voteSubmission: Vote) {
        
        const body = { ...voteSubmission }

        const urlString = `${environment.API_URL}/votes`;

        return this.http.post(urlString, body)
            .pipe(catchError(this.errorHandler));

    }

    voteResults() {
        const urlString = `${environment.API_URL}/votes/results`

        return this.http.get(urlString)
            .pipe(catchError(this.errorHandler))
    }

    private errorHandler(errorRes: HttpErrorResponse) {
        
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
// Angular imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models
import { Vote } from '../models/vote.model';

// Environment variables
import { environment } from '../../environments/environment';

@Injectable()

export class VoteService {
    constructor(private http: HttpClient) { }

    submitVote(voteSubmission: Vote) {
        
        const body = { ...voteSubmission }

        const urlString = `${environment.API_URL}/votes`
        return this.http.post(urlString, body);

    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from '../models/vote.model';

@Injectable()

export class VoteService {
    constructor(private http: HttpClient) { }

    submitVote(voteSubmission: Vote) {
        
        const body = { ...voteSubmission }

        const urlString = `http://localhost:9000/votes`
        console.log(body);
        return this.http.post(urlString, body);

    }

}
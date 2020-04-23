import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    loginUser(email: string, password: string): Observable<any> {
        const urlString = 'http://localhost:9000/users/login';
        const body = { email, password };

        return this.http.post(urlString, body); 
    }

    registerUser(submissionForm: any) {
        const urlString = `http://localhost:9000/users`;
        const requestBody = { ...submissionForm };
        return this.http.post(urlString, requestBody);
    }
}
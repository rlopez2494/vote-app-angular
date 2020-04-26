import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            
            if(!user || !user.token) { 
                return next.handle(req);
            }
           
            const modifiedReq = req.clone({
                headers: new HttpHeaders({'Authorization': `Bearer ${user.token}`})
            });
            
            return next.handle(modifiedReq);

        }))
        
    }

}
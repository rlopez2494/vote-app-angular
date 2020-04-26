import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router, 
    UrlTree
} from '@angular/router';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
        ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        routerState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            
            return this.authService.user.pipe(
                take(1),
                map(user => {
                    const isAuth = !!user;

                    if(isAuth) {
                        return true;
                    }

                    localStorage.removeItem('userData');
                    return this.router.createUrlTree(['']);
                })
            );
    }
}
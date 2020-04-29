import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { PlateService } from './plates/plate.service';
import { VoteService } from './vote/vote.service';

// Guards
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard';

@NgModule({
    providers: [
        AuthGuard, 
        AuthService, 
        CanDeactivateGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        },
        PlateService,
        VoteService
      ]
})

export class CoreModule {}
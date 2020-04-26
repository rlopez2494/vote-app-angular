import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemoveWrapper } from './directives/remove-wrapper.directive';
import { AutoComplete } from './directives/autocomplete.directive';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { VoteComponent } from './vote/vote.component';
import { OrganoComponent } from './vote/organo/organo.component';
import { PlatesComponent } from './plates/plates.component';
import { PlateItemComponent } from './plates/plate-item/plate-item.component';
import { PlateEditComponent } from './plates/plate-edit/plate-edit.component';
import { HeaderComponent } from './header/header.component';
import { PlateEditBodyComponent } from './plates/plate-edit/plate-edit-body/plate-edit-body.component';
import { PlateDetailsComponent } from './plates/plate-details/plate-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { CanDeactivateGuard } from './can-deactivate-guard';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { PlateService } from './plates/plate.service';
import { VoteService } from './vote/vote.service';


@NgModule({
  declarations: [
    AppComponent,
    RemoveWrapper,
    AutoComplete,
    HomeComponent,
    RegisterUserComponent,
    VoteComponent,
    OrganoComponent,
    PlatesComponent,
    PlateItemComponent,
    PlateEditComponent,
    HeaderComponent,
    PlateEditBodyComponent,
    PlateDetailsComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
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
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

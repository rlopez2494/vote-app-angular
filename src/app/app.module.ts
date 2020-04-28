// Main module imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

// Split modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { VoteComponent } from './vote/vote.component';
import { OrganoComponent } from './vote/organo/organo.component';
import { PlateItemComponent } from './plates/plate-item/plate-item.component';
import { PlateEditComponent } from './plates/plate-edit/plate-edit.component';
import { PlatesComponent } from './plates/plates.component';
import { HeaderComponent } from './header/header.component';
import { PlateEditBodyComponent } from './plates/plate-edit/plate-edit-body/plate-edit-body.component';
import { PlateDetailsComponent } from './plates/plate-details/plate-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

// Directives
import { RemoveWrapper } from './directives/remove-wrapper.directive';
import { AutoComplete } from './directives/autocomplete.directive';

// Services / Guards
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { PlateService } from './plates/plate.service';
import { VoteService } from './vote/vote.service';

// Guards
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard';


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

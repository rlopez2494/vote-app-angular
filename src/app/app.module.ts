import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewOption } from './home/view-option/view-option.component';
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
import { PlateService } from './plates/plate-edit/plate.service';
import { PlateDetailsComponent } from './plates/plate-details/plate-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewOption,
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
    PlateDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

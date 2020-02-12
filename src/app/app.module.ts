import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewOption } from './view-option/view-option.component';
import { RemoveWrapper } from './directives/remove-wrapper.directive';

@NgModule({
  declarations: [
    AppComponent,
    ViewOption,
    RemoveWrapper
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

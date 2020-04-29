import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path:'', component: HomeComponent },]),
        SharedModule
    ]
})

export class AuthModule {}
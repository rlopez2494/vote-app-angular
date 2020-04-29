import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { PlatesComponent } from './plates.component';
import { PlateItemComponent } from './plate-item/plate-item.component';
import { PlateEditComponent } from './plate-edit/plate-edit.component';
import { PlateEditBodyComponent } from './plate-edit/plate-edit-body/plate-edit-body.component';
import { PlateDetailsComponent } from './plate-details/plate-details.component';
import { PlatesRoutingModule } from './plates-routing.module';

// Modules
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        PlatesComponent,
        PlateItemComponent,
        PlateEditComponent,
        PlateEditBodyComponent,
        PlateDetailsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        PlatesRoutingModule,
        SharedModule
    ]
})
export class PlatesModule {}
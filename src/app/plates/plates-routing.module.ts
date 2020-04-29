import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../auth-guard.service';
import { PlatesComponent } from './plates.component';
import { CanDeactivateGuard } from '../can-deactivate-guard';
import { PlateEditComponent } from './plate-edit/plate-edit.component';

const routes: Routes = [
    { 
        path: '', 
        canActivate:[AuthGuard], 
        children: [
            {
                path: '',
                component: PlatesComponent
            },
            { 
                path: 'plateEdit', 
                canDeactivate: [CanDeactivateGuard],
                component: PlateEditComponent
            }
        ] 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PlatesRoutingModule {}
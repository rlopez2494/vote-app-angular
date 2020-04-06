import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { VoteComponent } from './vote/vote.component';
import { PlatesComponent } from './plates/plates.component';
import { PlateEditComponent } from './plates/plate-edit/plate-edit.component';


const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'registro-usuario', component: RegisterUserComponent },
  { path: 'voto', component: VoteComponent },
  { path: 'plates', component: PlatesComponent },
  { path: 'plates/plateEdit', component: PlateEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

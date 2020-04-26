import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { VoteComponent } from './vote/vote.component';
import { PlatesComponent } from './plates/plates.component';
import { PlateEditComponent } from './plates/plate-edit/plate-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'admin', component: HomeComponent },
  { path:'signup', component: RegisterUserComponent },
  { path: 'vote', canActivate:[AuthGuard], component: VoteComponent },
  { path: 'plates', canActivate:[AuthGuard], component: PlatesComponent },
  { path: 'plates/plateEdit', 
    canActivate:[AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    component: PlateEditComponent
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

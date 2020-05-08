// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Components
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'vote', loadChildren: './vote/vote.module#VoteModule' },
  { path: 'plates', loadChildren: './plates/plates.module#PlatesModule' },
  { path: 'results', component: ResultsComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

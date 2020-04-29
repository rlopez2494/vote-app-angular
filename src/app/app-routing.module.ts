// Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Components
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; 

const routes: Routes = [
  { path: '', loadChildren: './home/auth.module#AuthModule' },
  { path: 'vote', loadChildren: './vote/vote.module#VoteModule' },
  { path: 'plates', loadChildren: './plates/plates.module#PlatesModule' },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

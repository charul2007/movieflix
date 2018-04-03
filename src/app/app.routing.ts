import { Routes, CanActivate, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { GuardService as AuthGuard } from './services/guard.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { moviesRoutes } from './entertainment/movies/movies.routing';
import { TvComponent } from './entertainment/tv/tv.component';
import { peopleRoutes } from './entertainment/people/people.routing';
import { tvRoutes } from './entertainment/tv/tv.routing';

export const routes: Routes = [
  ...moviesRoutes,
  ...peopleRoutes,
  ...tvRoutes,

  { path: 'login', component: LoginComponent },
  { 
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '' } // default fallback

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

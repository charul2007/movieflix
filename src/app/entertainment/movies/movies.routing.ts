import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService as AuthGuard } from '../../services/guard.service';

import { MoviesComponent } from './movies.component';
import { SingleMovieDetailComponent } from '../movies/single-movie-detail/single-movie-detail.component';

export const moviesRoutes: Routes = [
  {
    path: 'movies/:category/:page',
    component: MoviesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'view/:id', component: SingleMovieDetailComponent, canActivate: [AuthGuard]  }
];

export const moviesRouting: ModuleWithProviders = RouterModule.forChild(moviesRoutes);

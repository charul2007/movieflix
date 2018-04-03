import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService as AuthGuard } from '../../services/guard.service';

import { TvComponent } from './tv.component';
//import { SingleMovieDetailComponent } from '../movies/single-movie-detail/single-movie-detail.component';

export const tvRoutes: Routes = [
  {
    path: 'tv/:category/:page',
    component: TvComponent,
    canActivate: [AuthGuard]
  },
  // { path: 'view/:id', component: SingleMovieDetailComponent, canActivate: [AuthGuard]  }
];

export const tvRouting: ModuleWithProviders = RouterModule.forChild(tvRoutes);

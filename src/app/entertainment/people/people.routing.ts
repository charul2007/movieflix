import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService as AuthGuard } from '../../services/guard.service';

import { PeopleComponent } from './people.component';
import { PersonDetailsComponent } from './person.details';

export const peopleRoutes: Routes = [
  {
    path: 'people/:page',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  { path: 'person/:id', component: PersonDetailsComponent, canActivate: [AuthGuard]  }
];

export const peopleRouting: ModuleWithProviders = RouterModule.forChild(peopleRoutes);

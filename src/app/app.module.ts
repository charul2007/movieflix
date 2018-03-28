import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducers';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/layout/navigation';
import { PaginationComponent } from './components/pagination.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { GuardService as AuthGuard } from './services/guard.service';
import { MoviesService } from './entertainment/movies/movies.service';
import { PeopleService } from './entertainment/people/people.service';
/// Routing ///
import { routing, appRoutingProviders } from './app.routing';
import { MoviesComponent } from './entertainment/movies/movies.component';
import { MoviesListComponent } from './entertainment/movies/movies.list.component';
import { SingleMovieDetailComponent } from './entertainment/movies/single-movie-detail/single-movie-detail.component';
import { TvComponent } from './entertainment/tv/tv.component';
import { PeopleComponent } from './entertainment/people/people.component';
import { PersonDetailsComponent } from './entertainment/people/person.details';
import { YearPipe } from './shared/year.pipe';
import { StatusColorPipe } from './shared/status-color.pipe';
import { JoinPipe } from './shared/join.pipe';
import { ProductionCountriesPipe } from './shared/production.countries.pipe';
import { CrewSortPipe } from './shared/crew.sort.pipe';

export const firebaseConfig = {
  apiKey: "AIzaSyDpsN3jievBApLmEQGlYBRTGDdQzdTLt6Y",
  authDomain: "ng-auth-4ceb7.firebaseapp.com",
  databaseURL: "https://ng-auth-4ceb7.firebaseio.com",
  projectId: "ng-auth-4ceb7",
  storageBucket: "ng-auth-4ceb7.appspot.com",
  messagingSenderId: "507886413690"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    PaginationComponent,
    MoviesComponent,
    MoviesListComponent,
    SingleMovieDetailComponent,
    TvComponent,
    PeopleComponent,
    PersonDetailsComponent,
    YearPipe,
    StatusColorPipe,
    JoinPipe,
    ProductionCountriesPipe,
    CrewSortPipe
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    AngularFireModule.initializeApp(firebaseConfig),
    // RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuard, appRoutingProviders, MoviesService, PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

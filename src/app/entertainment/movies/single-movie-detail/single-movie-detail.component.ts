import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'single-movie-detail',
  template: `
  <div class="container-fluid">
    <div class="row">
      <div class="movie-details">
        <div>
            <img class="image-container" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2{{movieDetails?.poster_path}}">
        </div>

        <div class="movie-details-container">
          <div class="movie-details-container-title">
            <h2 class="title">{{ movieDetails?.title }}</h2>
            <span class="release-date">({{ movieDetails?.release_date | year }})</span>
          </div>

          <div class="movie-overview-container">
            <span class="movie-overview-header">Overview</span>
            <span class="movie-overview-text">{{movieDetails?.overview}}</span>
          </div>

          <div class="movie-details-body">
            
            <div>
              <label>Production Countries</label>
              <ul class="movie-production-text">
                <li *ngFor="let production_country of movieDetails?.production_countries; let isLast=last;">
                  {{production_country.name}}{{isLast ? '' : ', '}}
                </li>
              </ul>
            </div>
            <div>
              <label>Budget</label>
               <div class="budget">
                {{movieDetails?.budget}}
              </div>
            </div>
            <div>
              <label>Revenue</label>
              <div class="revenue">
                {{movieDetails?.revenue}}
              </div>
            </div>
          </div>

          <div class="runtime">
            <i class="fa fa-file-video-o fa-2x"></i>
            {{movieDetails?.runtime}} mins.
          </div>

        </div>
      </div>
      
      <div class="cast-crew-container">
        
        <div class="cast-container">
          <div class="cast-header">
            <label>Cast</label> {{movieDetails?.credits?.cast.length}}
          </div>

          <ul class="people credits" *ngFor="let cast of movieDetails?.credits?.cast">
            <li>
              <a routerLink="/person/{{cast.id}}" routerLinkActive="active">
                <img *ngIf="cast?.profile_path" src="https://image.tmdb.org/t/p/w132_and_h132_bestv2{{cast?.profile_path}}"/>
                <span *ngIf="!cast?.profile_path" class="no_profile_path"><i class="fa fa-user fa-5x"></i></span>
              </a>
              <div>
                <div class="info">
                  <span style="font-weight: bold; color: #000;">{{cast.name}}</span>
                  <span>{{cast.character}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="crew-container">
          <div class="crew-header">
            <label>Crew</label> {{movieDetails?.credits?.crew.length}}
          </div>

          <ul class="people credits" *ngFor="let crew of movieDetails?.credits?.crew | crewSort: 'job'">
            <li>
              <a routerLink="/person/{{crew.id}}" routerLinkActive="active">
                <img *ngIf="crew?.profile_path" src="https://image.tmdb.org/t/p/w132_and_h132_bestv2{{crew?.profile_path}}"/>
                <span *ngIf="!crew?.profile_path" class="no_profile_path"><i class="fa fa-user fa-5x"></i></span>
              </a>
              <div>
                <div class="info">
                  <span style="font-weight: bold; color: #000;">{{crew.name}}</span>
                  <span>{{crew.job}}</span>
                </div>
              </div>

            </li>
          </ul>
        </div>

      <div>
    
    </div>
  </div>
  `,
  styles: [`
    .movie-details {
      width: 1000px;
      height: 450px;
      display: flex;
      border: 1px solid goldenrod;
      margin: 0 auto;
      margin-top: 150px;
    }
    .image-container {
      width: 300px;
    }
    .movie-details-container {
      width: 700px;
      padding: 30px 30px 30px 30px;
    }
    .movie-details-container-title {
      margin-top: 25px;
      margin-bottom: 25px;
      display: flex;
    }
    .release-date {
      opacity: 0.6;
      font-size: 1.7em;
      padding-left: 5px;
    }
    .title {
      margin: 0;
      padding: 0;
      font-size: 2.4em;
      line-height: 0.9em;
      font-weight: 700;
      display: inline-block;
    }
    .movie-overview-header {
      font-size: 1.8em;
      display: flex;
      margin-bottom: 10px;
    }
    .movie-production-text {
      margin-top: 0;
      justify-content: flex-start;
      flex-wrap: wrap;
      list-style-type: none;
      list-style-position: inside;
      margin: 0;
      padding: 0;
      display: flex;
    }
    .movie-details-body {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }
    .movie-production-header {
      font-weight: 400;
      font-size: 1.2em;
    }
    .runtime {
      margin-top: 15px;
    }
    .cast-crew-container {
      width: 1000px;
      display: flex;
      margin: 0 auto;
      margin-top: 25px;
    }
    .cast-container {
      flex: 0 0 50%;
    }
    .crew-container {
      flex: 0 0 50%;
    }
    ul.people.credits {
      list-style-type: none;
      list-style-position: outside;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    ul.credits li {
      width: 100%;
      flex: 0 0 auto;
      text-align: left;
      margin-top: 10px;
      margin-right: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
    ul.credits li img {
      width: 100px;
      height: 100px;
      border-radius: 4px;
    }
    ul.credits li > div {
      display: flex;
      align-items: center;
      align-content: center;
      min-height: 100px;
    }
    ul.credits li div .info {
      display: flex;
      padding-left: 14px;
      padding-right: 20px;
      width: 100%;
      flex-direction: column;
    }
    ul.credits li .no_profile_path {
      width: 100px;
      height: 100px;
      border-radius: 4px;
      text-align: center;
      padding-top: 20px;
      background-color: gainsboro;
    }
    .cast-header, .crew-header {
      line-height: 1.3em;
      font-size: 1.3em;
    }
  `]
})
export class SingleMovieDetailComponent implements OnInit {

  private movieID: string = '';
  private movieDetails;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
      this.movieID = params['id'];

      this.moviesService.getMovieDetails(this.movieID).subscribe(res => {
        this.movieDetails = res;
        console.log(this.movieDetails);
      });
    });

  }

}

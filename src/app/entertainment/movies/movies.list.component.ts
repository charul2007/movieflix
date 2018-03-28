import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Router, ActivatedRoute } from '@angular/router';

import { MoviesService } from './movies.service';
import { Movies } from './movies.interface';

@Component({
  selector: 'movies-list',
  template: `
  	<div class="container-fluid">
	<div class="movie-container">
		<div class="container-fluid">
			<div class="row">
			<div class="response">
				<div class="tile item" *ngFor="let tile of tiles">
					<div class="image_container">
						<a routerLink="/view/{{tile.id}}-{{tile.title | join}}" routerLinkActive="active">
							<img class="image_content" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2{{tile.poster_path}}">
						</a>
					</div>
					<div class="movie_details">
						<div class="flex movie_details_font_header">
							<span>{{tile.title}}</span>
							<span>{{tile.vote_average}} <i style="color: goldenrod; font-size: 16px;"
							class="{{tile.vote_average | statusColor}}"></i></span>
						</div>
						<div class="flex">
							<div>
								<span><i class="fa fa-calendar"></i></span>
								<span style="padding-left: 5px;">{{tile.release_date | year}}</span>
							</div>
							<div class="ellipsis">
								<span>{{tile.genre_names}}</span>
							</div>
						</div>
						<div class="overview">
							<span>{{tile.overview}}</span>
						</div>
						<div class="more_info">{{tile.id}}-{{tile.title}}
							<a routerLink="/movies/view/{{tile.id}}-{{tile.title}}" routerLinkActive="active">More Info</a>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

  `,
  styleUrls: ['./movies.component.css']
})
export class MoviesListComponent implements OnInit {

  private genres = [];
  @Input() tiles;
  private category: string = '';
  private page: string = '';

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
  		this.category = params['category'];
  		this.page = params['page'];

  	});

  }

}

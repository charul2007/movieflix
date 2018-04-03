import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'

import { TvService } from './tv.service';
// import { Movies } from './movies.interface';
import { Pagination } from '../../shared/pagination.interface';

@Component({
  selector: 'app-tv',
  template: `
  	<div class="container-fluid">
		<div class="sidebar">
			<ul class="nav nav-pills nav-stacked">
			  <li *ngFor="let nav of leftNavMenuItems">
			  	<a routerLink="/tv/{{nav.link}}" routerLinkActive="active">{{nav.caption}}</a>
			  </li>
			</ul>
		</div>
		<div>
			<pagination [paginationDetails]="paginationDetails" [baseUrl]="baseUrl" (onPaging)="onPaging($event)"></pagination>
			<entertainment-list [type]="tv" [tiles]="tiles"></entertainment-list>
		</div>
	</div>
  `,
  styles: [`
  	
  `]
})
export class TvComponent implements OnInit {

  private tiles;
  private genres = [];
  private leftNavMenuItems = [
	{ caption: 'Popular', link: [ '/popular/1' ] },
	{ caption: 'Top Rated', link: [ '/top_rated/1' ] },
	{ caption: 'On Air', link: [ '/on_the_air/1' ] },
	{ caption: 'Airing Today', link: [ '/airing_today/1' ] }
  ];
  private category: string = '';
  private page: string = '0';
  private paginationDetails: Pagination = {
  	page: 0,
  	total_pages: 0,
  	total_results: 0
  }

  constructor(private tvService: TvService,
  	     	  private route: ActivatedRoute,
  	     	  private router: Router) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
  		this.category = params['category'];
  		this.page = params['page'];
  		this.tvService.getTv(this.category, this.page).subscribe(res => {
			this.tiles = res.results;
			this.paginationDetails.page = res.page;
			this.paginationDetails.total_pages = res.total_pages
			this.paginationDetails.total_results = res.total_results;
		});
  	});

	// this.moviesService.getGenre().subscribe(res => {
	// 	// this.genres = res.genres;
	// 	this.tiles.map((tile: Movies) => {
	// 		tile.genre_names = [];
	// 		tile.genre_ids.map(genre_id => {
	// 			return res.genres.map(genre => {
	// 				if (genre.id === genre_id) {
	// 					tile.genre_names.push(genre.name);
	// 				}
	// 			});
				
	// 		})
	// 	});

	// 	console.log(this.tiles);
	// });

  }

  onPaging(event) {
  	let newPage = event.value.newPage;
  	this.router.navigate([`tv/${this.category}/${newPage}`]);
  }
}

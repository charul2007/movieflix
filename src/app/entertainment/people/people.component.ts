import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'

import { PeopleService } from './people.service';
import { Pagination } from '../../shared/pagination.interface';


@Component({
  selector: 'app-people',
  template: `
  	<div class="container-fluid">
		<div class="row">
			<pagination [paginationDetails]="paginationDetails" [baseUrl]="baseUrl" (onPaging)="onPaging($event)"></pagination>
			<div class="people-tile-container">
				<div class="people-content" *ngFor="let tile of tiles">
					<a routerLink="/person/{{tile.id}}" routerLinkActive="active">
						<img src="https://image.tmdb.org/t/p/w235_and_h235_bestv2{{tile.profile_path}}">
					</a>
					<div class="people-name">
						<p>{{tile.name}}</p>
					</div>
				</div>
			</div>
		</div>
	<div>
  `,
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  private tiles;
  private category: string = '';
  private page: string = '0';
  private paginationDetails: Pagination = {
  	page: 0,
  	total_pages: 0,
  	total_results: 0
  }
  private baseUrl = '/people';

  constructor(private peopleService: PeopleService,
  	     	  private route: ActivatedRoute,
  	     	  private router: Router) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
  		this.page = params['page'];
  		this.peopleService.getPeople(this.page).subscribe(res => {
			this.tiles = res.results;
			this.paginationDetails.page = res.page;
			this.paginationDetails.total_pages = res.total_pages
			this.paginationDetails.total_results = res.total_results;
			console.log(this.tiles);
		});
  	});
  }

  onPaging(event) {
  	let newPage = event.value.newPage;
  	this.router.navigate([`people/${newPage}`]);
  }

}

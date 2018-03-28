import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'

import { PeopleService } from './people.service';
import { Pagination } from '../../shared/pagination.interface';


@Component({
  selector: 'person-details',
  template: `
  	<div class="container-fluid">
		<div class="row">
			<div class="person-details-container">
				<div class="person-image-container">
					<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2{{personDetails?.profile_path}}">
				</div>
				<div class="person-details">
					<div class="person-header">
						<span class="person-name">{{personDetails?.name}}</span>
						<a *ngIf="personDetails?.external_ids?.facebook_id" class="social-link" href="https://www.facebook.com/{{personDetails?.external_ids?.facebook_id}}" target="_blank">
							<i class="fa fa-facebook-official fa-2x"></i>
						</a>
						<a *ngIf="personDetails?.external_ids?.imdb_id" class="social-link" href="http://www.imdb.com/name/{{personDetails?.external_ids?.imdb_id}}" target="_blank">
							<span class="fa fa-imdb fa-2x"></span>
						</a>
						<a *ngIf="personDetails?.external_ids?.instagram_id" class="social-link" href="https://www.instagram.com/{{personDetails?.external_ids?.instagram_id}}" target="_blank">
							<span class="fa fa-instagram fa-2x"></span>
						</a>
						<a *ngIf="personDetails?.external_ids?.twitter_id" class="social-link" href="https://twitter.com/{{personDetails?.external_ids?.twitter_id}}" target="_blank">
							<span class="fa fa-twitter-square fa-2x"></span>
						</a>
					</div>
					<div class="biography">
						<span class="biography-header">Biography</span>
						<div style="margin-top: 5px;">{{personDetails?.biography}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  `,
  styles: [`
  	.person-details-container {
  		width: 1000px;
	    margin: 0 auto;
	    padding-top: 40px;
	    padding-bottom: 40px;
	    display: flex;
	    flex-wrap: wrap;
	    align-items: flex-start;
  	}
  	.person-image {
  		display: block;
	    width: 300px;
	    height: 450px;
	    box-shadow: 0 0 4px rgba(0,0,0,0.2);
	    border-radius: 4px;
  	}
  	.person-details {
  		display: flex;
	    flex-wrap: wrap;
	    align-items: flex-start;
	    align-content: center;
	    width: 700px;
	    box-sizing: border-box;
	    padding-left: 40px;
  	}
  	.person-header {
  		margin-top: 60px;
  	}
  	.person-name {
  		margin: 0;
	    padding: 0;
	    font-size: 2.4em;
	    line-height: 1.1em;
	    font-weight: 700;
	    display: inline-block;
	    padding-right: 10px;
  	}
  	.social-link {
  		padding: 0px 5px 0px 0px;
  	}
  	.biography  {
  		margin-top: 15px;
  	}
  	.biography-header {
  		font-weight: 600;
    	line-height: 1.3em;
    	font-size: 1.3em;
  	}
  `]
})
export class PersonDetailsComponent implements OnInit {

	private personId: number;
	private personDetails: any;

  constructor(private peopleService: PeopleService,
  	     	  private route: ActivatedRoute,
  	     	  private router: Router) { }

  ngOnInit() {

  	this.route.params.subscribe(params => {
  		this.personId = params['id'];
  		this.peopleService.getPersonDetails(this.personId).subscribe(res => {
			this.personDetails = res;
			console.log(this.personDetails);
			});
  	});
  }

}

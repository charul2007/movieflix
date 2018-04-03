import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'navigation',
	template: 
	`
	<div class="container-fluid">
		<nav class="navbar navbar-default navbar-fixed-top">
			<ul class="nav navbar-nav">
				<li class="">
					<a class="navbar-brand" routerLink="/">
						<img class="media-logo" src="../../../assets/images/media.png">
					</a>
				</li>
	      <li class=""><a routerLink="/movies/popular/1" routerLinkActive="active">Movies</a></li>
	      <li class=""><a routerLink="/tv/popular/1" routerLinkActive="active">TV Shows</a></li>
	      <li class=""><a routerLink="/people/1" routerLinkActive="active">People</a></li>
	    </ul>

	    <div class="nav navbar-nav" style="margin-top: 9px; width: 350px;">
	      <input type="search" class="form-control" placeholder="Search" name="srch-term" id="srch-term">
	    </div>	

	    <ul class="nav navbar-nav navbar-right">
	      <li *ngIf="isLoggedIn">
	      	<p class="navbar-text navbar-right">Logged In as: {{userName}} {{userEmail}}</p>
	      </li>
	      <li *ngIf="!isLoggedIn">
	      	<p class="navbar-text navbar-right">Logged Out</p>
	      </li>
	    </ul>
		</nav>
	`,
	styles: [`
		.media-logo {
			width: 85px;
    	height: auto;
    	margin: -15px 0px 0px 0px;
		}
		.search-wrapper-container {
			width: 600px;
			padding: 0;
	    float: none;
	    margin: 0 auto 56px;
		}
		.search-wrapper {
			position: relative;
		}
		input[type="search"]::-webkit-search-cancel-button {

		}
	`
	]
})

export class NavigationComponent implements OnInit {
	
	private isLoggedIn: boolean;
  private userName: string;
  private userEmail: string;
  private navigationMenu = [];

	constructor(private authService: AuthService,
  	private router: Router) {
  }

	ngOnInit() {

		this.authService.angularfire.auth.subscribe(auth => {
  		if (auth === null) {
  			//User is not logged in
  			this.isLoggedIn = false;
  			this.userName = '';
  			this.userEmail = '';
  			this.router.navigate(['login']);
  		}
  		else {
  			//User is logged in
  			this.isLoggedIn = true;
  			this.userName = auth.google.displayName;
  			this.userEmail = auth.google.email;
  			this.router.navigate(['']);
  		}
  	});

	}
}
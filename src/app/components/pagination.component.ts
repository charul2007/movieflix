import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'

@Component({
  selector: 'pagination',
  template: `
	<div class="pagination">
		<span style="padding: 4px 10px 0px 0px;">Currently on page: {{paginationDetails?.page}} of {{paginationDetails?.total_pages}} ({{paginationDetails?.total_results}} results)</span>
		<div class="pagination-container">
			<span style="padding-right: 10px;" *ngIf="paginationDetails?.page !== 1">
				<a routerLink="{{prevLink}}" routerLinkActive="active" (click)="onPrev($event)">
					<i class="fa fa-arrow-circle-left fa-2x"></i>
				</a>
			</span>
			<span style="padding-left: 10px;">
				<a routerLink="{{nextLink}}" routerLinkActive="active" (click)="onNext($event)">
					<i class="fa fa-arrow-circle-right fa-2x"></i>
				</a>
			</span>
		</div>
	<div>
  `,
  styles: [`
  .pagination {
		display: flex;
    width: 1000px;
    margin: 0 auto;
    flex-flow: wrap;
    justify-content: flex-end;
    padding-right: 10px;
    margin-top: 25px;
	}
  `]
})
export class PaginationComponent {

	@Input() paginationDetails;
	@Input() baseUrl;
	@Output() onPaging = new EventEmitter<any>();
	private prevLink;
	private nextLink;

  constructor(private route: ActivatedRoute) { }

  ngOnChanges() {
    console.log('BaseURL: ' + this.baseUrl);
    this.prevLink = `${this.baseUrl}/${ this.paginationDetails.page - 1 }`;
    this.nextLink = `${this.baseUrl}/${ this.paginationDetails.page + 1 }`;
  }

  onNext(event) {
  	event.preventDefault();
  	this.onPaging.emit({
      value: {
        newPage: this.paginationDetails.page + 1
      }
    });
  }

  onPrev(event) {
  	event.preventDefault();
  	this.onPaging.emit({
      value: {
        newPage: this.paginationDetails.page - 1
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class PeopleService {

	private apiKey = 'e267a85018f963eb82d87dccbca42fbe';
	private url = 'http://api.themoviedb.org/3';
  //https://api.themoviedb.org/3/genre/movie/list?api_key=e267a85018f963eb82d87dccbca42fbe&language=en-US

  constructor(private http: Http) { }

  getPeople(page: string): Observable<any> {
  	let params: URLSearchParams = new URLSearchParams();
		params.set('api_key', this.apiKey);
    params.set('page', page);

		let requestOptions = new RequestOptions();
		requestOptions.search = params;

    return this.http.get(this.url + `/person/popular`, requestOptions).map((response: Response) => 
      response.json()
    )
  }

  getPersonDetails(personId: number): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('api_key', this.apiKey);
    params.set('append_to_response', 'external_ids');

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return this.http.get(this.url + `/person/${personId}`, requestOptions).map((response: Response) => 
      response.json()
    )
  }

  // getMovieDetails(name: string): Observable<any> {
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('api_key', this.apiKey);
  //   params.set('append_to_response', 'credits')

  //   let requestOptions = new RequestOptions();
  //   requestOptions.search = params;

  //   return this.http.get(this.url + `/movie/${name}`, requestOptions).map((response: Response) => 
  //     response.json()
  //   )
  // }
}

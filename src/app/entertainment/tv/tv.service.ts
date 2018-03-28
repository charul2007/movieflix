import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class TvService {

  private apiKey = 'e267a85018f963eb82d87dccbca42fbe';
  private url = 'http://api.themoviedb.org/3';
  //https://api.themoviedb.org/3/genre/movie/list?api_key=e267a85018f963eb82d87dccbca42fbe&language=en-US

  constructor(private http: Http) { }

  getTv(category: string, page: string): Observable<any> {
  	let params: URLSearchParams = new URLSearchParams();
	params.set('api_key', this.apiKey);
    params.set('page', page);

		let requestOptions = new RequestOptions();
		requestOptions.search = params;

    return this.http.get(this.url + `/tv/${category}`, requestOptions).map((response: Response) => 
      response.json()
    )
  }

}

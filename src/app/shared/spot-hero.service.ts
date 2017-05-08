import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { spotHeroAPI } from '../../../server/routes/SpotHeroDB';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


const X2JS = require('x2js'); // converts xml to javascript objects
const x2js = new X2JS();
const base64 = require('base-64'); // encode authorization header w/ get request to SpotHero 

@Injectable()
export class SpotHeroService {

  constructor(private _spotHeroAPI: spotHeroAPI, private http: Http) {}

  getFeed() {

  	let url = this._spotHeroAPI.rss;

   	let headers = new Headers();
   	headers.append('Authorization', "Basic " + base64.encode(this._spotHeroAPI.username + ":" + this._spotHeroAPI.password));

    let options = new RequestOptions({headers:headers});  


   	return Observable.interval(5400).flatMap(() => this.http.get(url,options)).map((res: Response) => x2js.xml2js(res.text()));
	//return this.http.get(url,options).map((res: Response) => x2js.xml2js(res.text()));

  }  

}

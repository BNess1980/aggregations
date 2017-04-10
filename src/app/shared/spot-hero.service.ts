import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { spotHeroAPI } from '../../../server/routes/SpotHeroDB';
import 'rxjs/add/operator/map';

const X2JS = require('x2js');
const x2js = new X2JS();
const parser = new DOMParser();
const base64 = require('base-64');

@Injectable()
export class SpotHeroService {

  constructor(private _spotHeroAPI: spotHeroAPI, private http: Http) {}

  getFeed() {

  	let url = this._spotHeroAPI.rss;

   	let headers = new Headers();
   	headers.append('Authorization', "Basic " + base64.encode(this._spotHeroAPI.username + ":" + this._spotHeroAPI.password));

    let options = new RequestOptions({headers:headers});  

	return this.http.get(url,options).map((res: Response) => x2js.xml2js(res.text()));

  }  

}

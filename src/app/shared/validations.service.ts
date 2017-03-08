import { Injectable } from '@angular/core';

@Injectable()
export class ValidationsService {

  emailRegex: string;

  constructor() { 
  	this.emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  }

  regexEmail() {
  	return this.emailRegex;
  }

}

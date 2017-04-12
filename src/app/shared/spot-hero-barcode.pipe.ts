import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SpotHeroBarcodePipe'
})

export class SpotHeroBarcodePipe implements PipeTransform {

  public spotHeroErrMsg:string;

  transform(value, args:string[]) {

  	let barcode = args;

  	console.log('args: '+barcode);

  	return value.filter(reservation => {
  		if(reservation.content.barcode === barcode) {
  			return reservation;
  		} else if(reservation.content.barcode !== barcode) {
  			return this.spotHeroErrMsg = 'No SpotHero Reservations wiht that number have been found';
  		}
  	});

  }

}
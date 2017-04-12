import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SpotHeroBarcodePipe'
})
export class SpotHeroBarcodePipe implements PipeTransform {

  transform(value, args:string[]) {

  	let barcode = args;

  	console.log('args: '+barcode);

  	return value.filter(reservation => {
  		if(reservation.content.barcode === barcode) {
  			return reservation;
  		} else {
  			console.log('No Reservation Found');
  			return false;
  		}
  	});

  }

}
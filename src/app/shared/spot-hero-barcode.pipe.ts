import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SpotHeroBarcodePipe'
})
export class SpotHeroBarcodePipe implements PipeTransform {

  transform(entries: any[], barcode: string): boolean {
    let filteredEntries = entries.filter(p => p.indexOf(barcode) !== -1);
    if(filteredEntries.length > 0)
    	return true;
    return false;
  }

}

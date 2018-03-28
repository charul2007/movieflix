import { Pipe } from '@angular/core';

@Pipe({
  name: 'productionCountries'
})
export class ProductionCountriesPipe {
  transform( value: any ) {
  	if (value) {
  	  return value.split(',');
  	}
  }
}

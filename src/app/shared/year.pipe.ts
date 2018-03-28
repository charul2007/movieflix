import { Pipe } from '@angular/core';

@Pipe({
  name: 'year'
})
export class YearPipe {
  transform( value: string ) {
  	if (value) {
  	  return value.split('-')[0];
  	}
  }
}

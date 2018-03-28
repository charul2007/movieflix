import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {
  transform( value ): string {
    if(value <= 5) {
      return 'fa fa-star-o';
    }
    else if(value <= 8 && value >= 5) {
      return 'fa fa-star-half-o';
    }
    else {
    	return 'fa fa-star';
    }
  }
}

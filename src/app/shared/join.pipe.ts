import { Pipe } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe {
  transform( value: string ) {
    return value.split(' ').join('-');
  }
}

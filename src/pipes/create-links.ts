import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'createlinks'
})
@Injectable()
export class CreateLinks {

  transform(value, args) {
    //value = value + ''; // make sure it's a string
    console.log(value, 'hi')
    return value;
  }
}

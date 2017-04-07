import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the CreateLinkText pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'createLinkText'
})
@Injectable()
export class CreateLinkText {

  private transformDict = {
    "1": { "idApp": 26, "title": "Randstad & Groene Hart" },
    "2": { "idApp": 13, "title": "IJsselmeerpolders" },
    "3": { "idApp": 20, "title": "Nagele" },
    "4": { "idApp": 4, "title": "‘Blokjeskaart’" },
    "5": { "idApp": 10, "title": "Groeikern Houten" },
    "6": { "idApp": 9, "title": "Ecologische Hoofdstructuur" }
  }

  transform(value, args) {

    if (value[1] !== '→') {
      return value;
    }
    console.log(value)
    let key = value.match(/\d\d?/)[0]
    return Object.keys(this.transformDict).indexOf(key) > -1 ? this.transformDict[key].title : "linktekst volgt";
    
  }
}

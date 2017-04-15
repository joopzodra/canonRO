import { Injectable, Pipe } from '@angular/core';

import { entryIdTransformDict } from '../helpers/entryIdTransformDict';


@Pipe({
  name: 'createLinkText'
})
@Injectable()
export class CreateLinkText {

  transform(value, args) {

    let matches = value.match(/link(\d\d?)/);
    if (matches) {
      let key = matches[1];
       return Object.keys(entryIdTransformDict).indexOf(key) > -1 ? '(\u00bb ' + entryIdTransformDict[key].title + ')' : '(\u00bb ' + 'link volgt' + ')';
    }

    return value;    
  }
}

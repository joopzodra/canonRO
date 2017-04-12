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
       return Object.keys(entryIdTransformDict).indexOf(key) > -1 ? '(\u2192 ' + entryIdTransformDict[key].title + ')' : '(\u2192 ' + 'link volgt' + ')';
    }

    return value;    
  }
}

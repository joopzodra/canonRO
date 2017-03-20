import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'splitLinks'
})
@Injectable()
export class SplitLinks {

  transform(paragraph, args) {

    const regEx = /([\s\S]+?)(\(→ \d\d?\)|$)/g;
    let match;
    let spans = [];

    while ((match = regEx.exec(paragraph)) !== null) {
      match.slice(1).forEach(span => {
        if (span !== '') {
          spans.push(span)
        }
      });
    }

    return spans;
  }

}

import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'splitLinks'
})
@Injectable()
export class SplitLinks {

  transform(paragraph, args) {

    //regex to discover up to 4 numbers within (→ xx, xx, xx, xx)
    const regEx = /([\s\S]+?)(?:\(→ (\d\d?)(?:, (\d\d?))?(?:, (\d\d?))?(?:, (\d\d?))?\)|$)/g;
    let match;
    let spans = [];

    while ((match = regEx.exec(paragraph)) !== null) {
      match.slice(1).forEach(span => {
        if (span) {
          if (!/^\d\d?$/.test(span)) {
            spans.push(span);
          } else {
            if (spans[spans.length - 1].substring(0, 4) !== 'link') {
              spans.push('link' + span);
            } else {
              spans.push(', ');
              spans.push('link' + span);
            }
          }
        }
      });
    }
    return spans;
  }

}

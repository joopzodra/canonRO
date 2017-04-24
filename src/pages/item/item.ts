import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ModalController, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { IEntry } from '../../datatypes/i-entry';
import { ImageSliderPage } from '../imageSlider/imageSlider';
import { entryIdTransformDict } from '../../helpers/entryIdTransformDict';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

  private entries: IEntry[];
  private slideEntries: IEntry[];
  private index: number;
  @ViewChild(Slides) slides: Slides;
  private entry;

  constructor(private navCtrl: NavController, private navParams: NavParams, private data: DataService, private modalCtrl: ModalController, private viewCtrl: ViewController) { }

  ngOnInit() {

    this.entries = this.data.entries;
    this.index = +this.navParams.get('index');
    this.entry = this.entries[this.index];
    //this.setSlideEntries();

    //Not used anymore, see below
    //initialSlide directive triggers onNext() and so changes this.index; we set this.index back to initial value
    /*    if (this.index > 0 && this.index <= this.entries.length - 1) {
          this.index--;
        } else if (this.index === 0) {
          this.index = this.entries.length - 1;
        }*/
  }


  private imgUrl(id: number, n: number) {
    return ['assets/ro-img/', id, '-', n, '.jpg'].join('');
  }

  private showImages(entry: IEntry, initialImg: number) {

    let modal = this.modalCtrl.create(ImageSliderPage, { entry, initialImg });
    modal.present();
  }

  private isLink(span) {
    return span.substring(0, 4) === 'link' || span.substring(0, 6) === ', link' ? true : false;
  }

  private goToItem(span) {
    let bookNumber = span.substring(4); //span format is: 'linkXX'
    let entriesIndex = entryIdTransformDict[bookNumber].appId - 1;
    return this.navCtrl.push(ItemPage, { index: entriesIndex });
  }

//This section was used when in this tab you could swipe to the next entry. It's not used since it made going back in navigation history and going to root of the tab after clicking the tab complex. Keep it as comment for lookup howto reasons. See also html here below.
  /*  private setSlideEntries() {
  
      if (this.index > 0 && this.index < this.entries.length - 1) {
        this.slideEntries = this.entries.slice(this.index - 1, this.index + 2);
      } else if (this.index === 0) {
        this.slideEntries = this.entries.slice(-1).concat(this.entries.slice(0, 2));
      } else if (this.index === this.entries.length - 1) {
        this.slideEntries = this.entries.slice(-2).concat(this.entries.slice(0, 1));
      }
    }
  
    private onNext() {
  
      if (this.index >= 0 && this.index < this.entries.length - 1) {
        this.index++;
      } else if (this.index === this.entries.length - 1) {
        this.index = 0;
      }
  
      this.setSlideEntries();
  
      //set runCallbacks to false, otherwise an onPrev() will be called by slideTo()
      this.slides.slideTo(1, 0, false);
    }
  
    private onPrev() {
  
      if (this.index > 0 && this.index <= this.entries.length - 1) {
        this.index--;
      } else if (this.index === 0) {
        this.index = this.entries.length - 1;
      }
      this.setSlideEntries();
  
      //set runCallbacks to false, otherwise an onNext() will be called by slideTo()
      this.slides.slideTo(1, 0, false);
    }*/

}

/*<ion-content padding>
  <ion-slides [initialSlide]="1" (ionSlideNextEnd)="onNext()" (ionSlidePrevEnd)="onPrev()">
    <ion-slide *ngFor="let entry of slideEntries">

    </ion-slide>
  </ion-slides>
</ion-content>*/

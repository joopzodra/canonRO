import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IEntry } from '../../datatypes/i-entry';

@Component({
  selector: 'page-imageSlider',
  templateUrl: 'imageSlider.html'
})
export class ImageSliderPage {

  private entry: IEntry;
  private initialImg: number;
  private img1Url: string;
  private img2Url: string;
  private img3Url: string;
  private img4Url: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) { }

  ngOnInit() {

    this.entry = this.navParams.get('entry');
    this.initialImg = +this.navParams.get('initialImg');
    this.getUrls();
  }

  private getUrls() {
    this.img1Url = this.imgUrl(this.entry.id, 1);
    this.img2Url = this.imgUrl(this.entry.id, 2);
    this.img3Url = this.entry.img3 !== 'false' ? this.imgUrl(this.entry.id, 3) : undefined;
    this.img4Url = this.entry.img4 !== 'false' ? this.imgUrl(this.entry.id, 4) : undefined;
  }

  private imgUrl(id: number, n: number) {
    return ['assets/ro-img/', id, '-', n, '.jpg'].join('');
  }

  private goBack() {
    this.navCtrl.pop();
  }
}

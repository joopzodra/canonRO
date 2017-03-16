import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { IEntry } from '../../datatypes/i-entry';

@Component({
  selector: 'page-imageSlider',
  templateUrl: 'imageSlider.html'
})
export class ImageSliderPage {

  entry: IEntry;
  img: number;
  img1Url: string;
  img2Url: string;
  img3Url: string;
  img4Url: string;

  @ViewChild(Slides) slides: Slides;

  constructor(private navCtrl: NavController, private navParams: NavParams) { }

  ngOnInit() {

    this.entry = this.navParams.get('entry');
    this.img = this.navParams.get('img');

    this.img1Url = this.navParams.get('img1');
    this.img2Url = this.navParams.get('img2');
    this.img3Url = this.navParams.get('img3');
    this.img4Url = this.navParams.get('img4');
  }

  goBack() {
    this.navCtrl.pop();
  }
}

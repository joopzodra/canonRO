import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../services/data.service' ;
import { IEntry } from '../../datatypes/i-entry';
import { ImageSliderPage } from '../imageSlider/imageSlider';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'
})
export class ItemPage {

  entries: IEntry[];
  id: number;

  //image url's
  img1: string;
  img2: string;
  img3: string;
  img4: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private data: DataService, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.entries = this.data.entries;
    this.id = this.navParams.get('id');
    //this.entry = this.data.getEntry(this.id);

    //set image url's
/*    ['img1', 'img2', 'img3', 'img4'].forEach(img => {
      if (this.entry[img] !== 'false') {
        this[img] = ['../../assets/ro-img/', this.entry.id, '-', img[3], '.jpg'].join('');
      }
    });*/
  }

  imgUrl(id: number, n: number) {
    return ['../../assets/ro-img/', id, '-', n, '.jpg'].join('');
  }

  showImages(img: number) {
    /*let modal = this.modalCtrl.create(ImageSliderPage, { entry: this.entry, img: img, img1: this.img1, img2: this.img2, img3: this.img3, img4: this.img4 });
    modal.present();*/
  }

}

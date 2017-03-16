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

  private entries: IEntry[];
  tempId: number;

  constructor(private navCtrl: NavController, private navParams: NavParams, private data: DataService, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.entries = this.data.entries;
    this.tempId = +this.navParams.get('id');
  }

  private imgUrl(id: number, n: number) {
    return ['../../assets/ro-img/', id, '-', n, '.jpg'].join('');
  }

  private showImages(entry: IEntry, initialImg: number) {

    let modal = this.modalCtrl.create(ImageSliderPage, { entry, initialImg });
    modal.present();
  }

}

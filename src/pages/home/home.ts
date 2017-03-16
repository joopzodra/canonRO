import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ItemPage } from '../item/item';
import { IEntry } from '../../datatypes/i-entry';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entries;

  constructor(private navCtrl: NavController, private data: DataService) { }

  ngOnInit() {
    this.entries = this.data.getAllEntries();
  }

  getIcon(id: number) {
    return '../../assets/ro-img/' + id + '-1.jpg';
  }

  goTo(id: number): Promise<any> {
    return this.navCtrl.push(ItemPage, {id});
  }

}

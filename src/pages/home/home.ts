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

  private entries;

  constructor(private navCtrl: NavController, private data: DataService) { }

  ngOnInit() {
    this.entries = this.data.getAllEntries();
  }

  private getIcon(id: number) {
    return '../../assets/ro-img/' + id + '-1.jpg';
  }

  private goTo(id: number): Promise<any> {
    let tempItem = this.data.entries.filter(entry => entry.id === id)[0];
    let tempId = this.data.entries.indexOf(tempItem);
    return this.navCtrl.push(ItemPage, {id: tempId});
  }

}

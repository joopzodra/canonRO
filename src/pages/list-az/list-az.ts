import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { IEntry } from '../../datatypes/i-entry';
import { ItemPage } from '../item/item';

@Component({
  selector: 'list-az',
  templateUrl: 'list-az.html'
})
export class ListAzPage {

  private entries: Observable<IEntry[]>;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.entries = this.navParams.get('entries') ;
  }

  private getIcon(id: number) {
    return 'assets/ro-img/' + id + '-1.jpg';
  }

  private goTo(index: number): Promise<any> {
    
    return this.navCtrl.push(ItemPage, {index});
  }

}

import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../../services/data.service';
import { ItemPage } from '../../item/item';

@Component({
  selector: 'list-az',
  templateUrl: 'list-az.html'
})
export class ListAzComp {

@Input() entries;

  constructor(public navCtrl: NavController, private data: DataService) {}

  private getIcon(id: number) {
    return 'assets/ro-img/' + id + '-1.jpg';
  }

  private goTo(id: number): Promise<any> {
    
    //corrigeren als alle 35 items er zijn
    let tempItem = this.data.entries.filter(entry => entry.id === id)[0];
    let tempId = this.data.entries.indexOf(tempItem);
    
    return this.navCtrl.push(ItemPage, {id: tempId});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAz');
  }

}

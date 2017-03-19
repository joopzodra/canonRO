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

  private goTo(index: number): Promise<any> {
    
    return this.navCtrl.push(ItemPage, {index});
  }

}

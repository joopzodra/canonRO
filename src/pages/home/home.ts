import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ItemPage } from '../item/item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private entries;
  private mode = 'A-Z';

  constructor(private navCtrl: NavController, private data: DataService) { }

  ngOnInit() {
    this.entries = this.data.getAllEntries();
  }

}

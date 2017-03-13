import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subject } from 'rxjs';

import { SQLiteService } from '../../services/sqlite.service';
import { entriesCsv } from '../../helpers/dexie-db/entries-csv';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entries;

  constructor(public navCtrl: NavController, private sqlite: SQLiteService) { }

  ngOnInit() {
    this.entries = this.sqlite.getAllEntries()     
      .catch(err => console.log(err.message));
  }

}

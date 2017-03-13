import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { DexieDb } from '../helpers/dexie-db/dexie-db';
import { IEntry } from '../datatypes/i-entry';

@Injectable()
export class SQLiteService {

  private win: any = window;
  private db;

  constructor(private platform: Platform) {

    /*Although this app is designed for mobile devices, we also want to demonstrate it in a browser. In the browser we need an prepopulated Dexie (Indexed DB) database instead of the mobile native sqlite. We set it up in src/helpers/dexie-db/dexie-db,instantiate it here, and bind the dexie db methods to this.db instead of the SQLite-methods */
    if (!platform.is('cordova')) {
      this.db = new DexieDb();
      this.getEntry = this.db.getEntry.bind(this.db);
      this.getAllEntries = this.db.getAllEntries.bind(this.db);
    } else {
      platform.ready().then(() => {
        if (this.win.sqlitePlugin) {
          this.db = this.win.sqlitePlugin.openDatabase({
            name: 'canonRO.sqlite',
            location: 'default',
            createFromLocation: 1
          });
        }
      });
    }
  }

  private query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) =>
      this.db.transaction((tx) =>
        tx.executeSql(query, params, (tx, res) => resolve({ tx: tx, res: res }), (tx, err) => reject(err))
      ));
  }

  private sqlResponseToArray(sqlResponse) {
    let arr = [];
    let length = sqlResponse.res.rows.length;
    for (let i = 0; i < length; i++) {
      arr.push(sqlResponse.res.rows.item(i));
    }
    return arr;
  }

  public getEntry(id): Promise<IEntry> {
    let query = 'SELECT * FROM entries WHERE id=' + id;
    return this.query(query)
      .then(sqlResponse => this.sqlResponseToArray(sqlResponse)[0]);
  }

  public getAllEntries(): Promise<IEntry[]> {
    let query = 'SELECT * FROM entries';
    return this.query(query)
      .then(sqlResponse => this.sqlResponseToArray(sqlResponse));
  }

}
